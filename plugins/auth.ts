import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
  FastifyError,
} from 'fastify';
import auth, { BasicAuthResult } from 'basic-auth';
import { Unauthorized } from 'http-errors';
import fp from 'fastify-plugin';

// TODO: move to global types
type NextCallback = (error?: unknown) => void;

interface AuthPluginOptions {
  header: string | undefined;
  validate: (
    authResult: BasicAuthResult,
    req: FastifyRequest,
    res: FastifyReply,
    next: NextCallback
  ) => boolean;
}

const checkOptions = (obj: unknown): obj is AuthPluginOptions =>
  typeof (obj as AuthPluginOptions).validate === 'function';

const isPromise = <T>(obj: unknown): obj is Promise<T> =>
  !!obj && typeof (obj as Promise<T>).then === 'function';

const isFastifyError = (obj: unknown): obj is FastifyError =>
  !!obj && !!(obj as FastifyError).statusCode;

const AuthPlugin = async (
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) => {
  if (!checkOptions(options)) {
    throw new Error('Basic Auth: Missing validate function');
  }

  const header =
    (options.header && options.header.toLowerCase()) || 'authorization';

  const validate = options.validate.bind(fastify);

  const authPlugin = (
    req: FastifyRequest,
    res: FastifyReply,
    next: NextCallback
  ): void => {
    if (!req.headers) {
      next(new Unauthorized('Missing authorization header'));
      return;
    }

    const done = (err: unknown) => {
      // We set the status code to be 401 if it is not set
      if (!(typeof err === 'object')) {
        next();
        return;
      }

      const error = {
        ...err,
        statusCode: isFastifyError(err) ? err.statusCode : 401,
      };

      if (error.statusCode === 401) {
        res.header('WWW-Authenticate', 'Basic');
      }

      next(error);
    };

    const authHeader = req.headers[header];

    if (!authHeader) {
      done(new Unauthorized('Missing authorization header'));
      return;
    }

    const credentials = auth.parse(
      Array.isArray(authHeader) ? authHeader[0] : authHeader
    );

    if (!credentials) {
      done(new Unauthorized('Bad formatted authorization header'));
      return;
    }

    const result = validate(credentials, req, res, done);

    if (isPromise(result)) {
      result.then(done, done);
    }
  };

  fastify.decorate('auth', authPlugin);
};

export default fp(AuthPlugin, {
  name: 'custom-auth',
});
