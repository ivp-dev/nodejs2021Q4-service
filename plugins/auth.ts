import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import fp from 'fastify-plugin';

export type NextCallback = (error?: unknown) => void;

export type DoneCallback = NextCallback;

const authPluginFn = async (
  fastify: FastifyInstance
  // options: FastifyPluginOptions
) => {
  const authPluginHandler = async (
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<void> => {
    try {
      await req.jwtVerify();
    } catch (err) {
      res.send(err);
    }
  };

  fastify.decorate('auth', authPluginHandler);
};

export type AuthPlugin = (
  req: FastifyRequest,
  res: FastifyReply,
  next: NextCallback
) => void;

export default fp<FastifyPluginOptions>(authPluginFn, {
  name: 'jwt-auth',
});
