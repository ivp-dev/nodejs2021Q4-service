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

export type NextCallback = (error?: unknown) => void;

export type DoneCallback = NextCallback;

export interface AuthPluginOptions {
  header?: string;
  validate: (
    authResult: BasicAuthResult,
    req: FastifyRequest,
    res: FastifyReply,
    done: DoneCallback
  ) => void | Promise<void>;
}

const checkOptions = (obj: unknown): obj is AuthPluginOptions =>
  typeof (obj as AuthPluginOptions).validate === 'function';

const isPromise = <T>(obj: unknown): obj is Promise<T> =>
  !!obj && typeof (obj as Promise<T>).then === 'function';

const isFastifyError = (obj: unknown): obj is FastifyError =>
  !!obj && !!(obj as FastifyError).statusCode;

const authPluginFn = async (
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) => {
  if (!checkOptions(options)) {
    throw new Error('Basic Auth: Missing validate function');
  }

  const header =
    (options.header && options.header.toLowerCase()) || 'authorization';

  const { validate } = options; // .validate.bind(fastify);

  const authPluginHandler = (
    req: FastifyRequest,
    res: FastifyReply,
    next: NextCallback
  ): void => {
    const done = (err?: unknown) => {
      // We set the status code to be 401 if it is not set
      if (typeof err === 'object') {
        const statusCode = isFastifyError(err) ? err.statusCode : 401;

        if (statusCode && !isFastifyError(err)) {
          Object.defineProperty(err, 'statusCode', {
            value: statusCode,
            writable: false,
          });
        }

        if (statusCode === 401) {
          res.header('WWW-Authenticate', 'Basic');
        }

        next(err);
      } else {
        next();
      }
    };

    if (!req.headers) {
      done(new Unauthorized('Missing authorization header'));
    } else {
      const authHeader = req.headers[header];

      if (!authHeader) {
        done(new Unauthorized('Missing authorization header'));
      } else {
        const credentials = auth.parse(
          Array.isArray(authHeader) ? authHeader[0] : authHeader
        );

        if (!credentials) {
          done(new Unauthorized('Bad formatted authorization header'));
        } else {
          const result = validate(credentials, req, res, done);

          if (isPromise(result)) {
            result.then(done, done);
          }
        }
      }
    }
  };

  fastify.decorate('auth', authPluginHandler);
};

export type AuthPlugin = (
  req: FastifyRequest,
  res: FastifyReply,
  next: NextCallback
) => void;

export default fp<AuthPluginOptions>(authPluginFn, {
  name: 'custom-auth',
});
