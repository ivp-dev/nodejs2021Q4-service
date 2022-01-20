import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify';
import fp from 'fastify-plugin';
import fs from 'fs';
import path from 'path';

type NextCallback = (error?: FastifyError) => void;

const getDateTime = (): string => new Date().toLocaleString();

const appendTime = (message: string) => `${getDateTime()}: ${message}`;

export interface LoggerPlugin {
  info: (message: string) => Promise<void>;
  debug: (message: string) => Promise<void>;
  error: (message: string) => Promise<void>;
  warn: (message: string) => Promise<void>;
}

export type FastifyInstanceLoggingSupport = FastifyInstance &
  Partial<LoggerPlugin>;

/**
 * Logger plugin
 * @param fastify - Fastify instance
 * @param options - plugin options
 * @param next - next callback
 */
const loggerPlugin = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  next: NextCallback
) => {
  const internalOptions = { level: 0, ...options };
  const filePath = path.dirname(options.filePath);

  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }

  const errorFileWriteStream = fs.createWriteStream(options.filePath, {
    flags: 'a',
    encoding: 'utf-8',
  });

  /**
   * Write log to file
   * @param type - type of log message
   * @param message - message string
   * @returns Promise void
   */
  const logging = (type: string, message: string): Promise<void> => {
    const targetMessage = appendTime(`type: ${type}, message: ${message} \n`);

    return new Promise((resolve, reject) => {
      errorFileWriteStream.write(targetMessage, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  };

  /**
   * Log info message
   * @param message - message string
   */
  const info = async (message: string) => {
    if (internalOptions.level >= 2) {
      await logging('info', message);
    }
  };

  /**
   * Log debug message
   * @param message - message string
   */
  const debug = async (message: string) => {
    if (internalOptions.level >= 3) {
      await logging('debug', message);
    }
  };

  /**
   * Log error message
   * @param message - message string
   */
  const error = async (message: string) => {
    await logging('error', message);
  };

  /**
   * Log warn message
   * @param message - message string
   */
  const warn = async (message: string) => {
    if (internalOptions.level >= 1) {
      await logging('warn', message);
    }
  };

  const logger: LoggerPlugin = {
    info,
    debug,
    error,
    warn,
  };

  fastify.decorate('logger', logger);

  next?.();
};

export default fp(loggerPlugin, {
  name: 'custom-logger',
});
