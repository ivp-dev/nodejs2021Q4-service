const NODE_ENV = require('./common/config').NODE_ENV

// Require the framework and instantiate it
const fastify = require('fastify')({ logger: NODE_ENV === 'development' })

// Declare a route
fastify.get('/', async (_, res) => {
    res.send('Service is running!');
})

fastify.register(require('fastify-swagger'), {
    mode: 'static',
    routePrefix: '/doc',
    specification: {
        path: './doc/api.yaml'
    },
    exposeRoute: true
});

module.exports = fastify;