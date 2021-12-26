import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify';
import fp from 'fastify-plugin';

type NextCallback = (error?: FastifyError) => void; 

export interface LoggerPlugin {
  info: (message: string) => Promise<void>;
  debug: (message: string) => Promise<void>;
  error: (message: string) => Promise<void>;
  warn: (message: string) => Promise<void>;
  all: (message: string) => Promise<void>;
}

export type FastifyInstanceLoggingSupport = FastifyInstance & Partial<LoggerPlugin>

const loggerPlugin = async (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  next: NextCallback
): Promise<void> => {
  const internalOptions = { level: 1, ...options };

  const logger = async (type: string, message: string) => {
    console.log(`${type}, message: ${message}`);
  };

  const info = async (message: string) => {
    if (internalOptions.level < 2) return;
    await logger('info', message);
  };

  const debug = async (message: string) => {
    if (internalOptions.level < 3) return;
    await logger('debug', message);
  };

  const error = async (message: string) => {
    if (internalOptions.level < 3) return;
    await logger('error', message);
  };

  const warning = async (message: string) => {
    if (internalOptions.level < 3) return;
    await logger('debug', message);
  };

  const all = async (message: string) => {
    if (internalOptions.level < 3) return;
    await logger('debug', message);
  };

  fastify.decorate('logger', {
    all,
    info,
    debug,
    error,
    warning,
  });

  next?.();
};

export default fp(loggerPlugin);
