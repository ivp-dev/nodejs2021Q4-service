import pino, { Level } from 'pino';
import config from './config';

const transport = pino.transport({
  targets: [
    {
      target: 'pino/file',
      level: 'error',
      options: {
        destination: config.LOG_ERROR_FILE_PATH,
      },
    },
    {
      target: 'pino/file',
      level: config.LOGGIN_LEVEL as Level,
      options: {
        destination: config.LOG_FILE_PATH,
      },
    },
  ],
});

export const serializers: {
  [key: string]: pino.SerializerFn;
} = {
  err: (err) => pino.stdSerializers.err(err),
  req: (req) => {
    if (config.NODE_ENV !== 'production') {
      return {
        ...pino.stdSerializers.req(req),
        body: req.raw.body,
      };
    }

    return pino.stdSerializers.req(req);
  },
  res: (res) => pino.stdSerializers.res(res),
};

export const logger = pino(transport);
