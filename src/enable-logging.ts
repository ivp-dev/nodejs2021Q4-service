import { FastifyInstance } from 'fastify';

const enableLogging = async (fastify: FastifyInstance) => {
  
  process.on('uncaughtException', (error) => {
    fastify.log.error(error.message);
  });

  process.on('unhandledRejection', (error) => {
    if (error instanceof Error) {
      fastify.log.error(error.message);
    } else {
      fastify.log.error(JSON.stringify(error));
    }
  });

  fastify.addHook('preHandler', async (req, _rep, done) => {
    const { hostname, url, params, body, method } = req;

    fastify.log.info(
      `Method: ${method}, host: ${hostname},url: ${url}, query params: ${JSON.stringify(
        params
      )} body: ${JSON.stringify(body)}`
    );
    
    done();
  });
};

export default enableLogging;
