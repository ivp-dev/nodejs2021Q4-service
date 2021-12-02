// Require the framework and instantiate it
const fastify = require('fastify');
const { FastifyInstance } = require('fastify');
const swagger = require('fastify-swagger');
const { NODE_ENV } = require('./common/config');
const userRouter = require('./resources/users/user.router');
const schemas = require('./resources/users/schemas');

/**
 * @type {FastifyInstance}
 */
const app = fastify({ logger: NODE_ENV === 'development' });

// Set swagger docs
app.register(swagger, {
    mode: 'static',
    routePrefix: '/doc',
    specification: {
        path: './doc/api.yaml'
    },
    exposeRoute: true
});

// Add schemas
app.addSchema(schemas.userGet);
app.addSchema(schemas.userPost);

// Setup plugin
app.register(userRouter);

module.exports = app;