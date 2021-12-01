const User = require('./user.model');
const usersService = require('./user.service');

/**
 * Set user route
 * @param {import('fastify').FastifyInstance} fastify 
 * @param {object} options 
 * @param {*} done 
 */
function userRoutes(fastify, options, done) {

  fastify.get('/users', async (req, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.send(users.map(User.toResponse));
  });

  

  done()
}

module.exports = userRoutes;
