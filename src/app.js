// Require the framework and instantiate it
const fastify = require('fastify');
const swagger = require('fastify-swagger');
const { NODE_ENV } = require('./common/config');
const userRouter = require('./resources/users/user.router');

const app = fastify({ logger: NODE_ENV === 'development' });

// Declare a route
app.get('/', async (_, res) => {
    res.send('Service is running!');
})

app.register(swagger, {
    mode: 'static',
    routePrefix: '/doc',
    specification: {
        path: './doc/api.yaml'
    },
    exposeRoute: true
});

app.register(userRouter);

module.exports = app;