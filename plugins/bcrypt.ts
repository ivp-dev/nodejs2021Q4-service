import {
  FastifyInstance,
  FastifyPluginOptions,
} from 'fastify';

import bcrypt from 'bcrypt';
import fp from 'fastify-plugin';

export type NextCallback = (error?: unknown) => void;

const bcryptPluginFn = async (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  next?: NextCallback
): Promise<void> => {
  const { saltWorkFactor } = options;

  const hash = async (pwd: string) => bcrypt.hash(pwd, saltWorkFactor ?? 10);

  const compare = async (claim1: string, claim2: string) =>
    bcrypt.compare(claim1, claim2);

  fastify
    .decorateRequest('bcryptHash', hash)
    .decorateRequest('bcryptCompare', compare);

  next?.();
};

interface BcryptPluginOpts {
  saltWorkFactor: number;
}

export default fp<BcryptPluginOpts>(bcryptPluginFn, {
  name: 'ivp-bcrypt',
});
