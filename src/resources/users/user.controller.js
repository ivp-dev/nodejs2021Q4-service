const { RouteHandlerMethod } = require('fastify');
const usersService = require('./user.service');

/**
 * @type {RouteHandlerMethod}
 */
async function getUsers(req, res) {
	const users = await usersService.getAll();
	// map user fields to exclude secret fields like "password"
	res.code(200).send(users);
}

/**
 * @type {RouteHandlerMethod}
 */
async function getUser(req, res) {
	const { userId } = req.params;

	const user = await usersService.getById(userId);

	if (!user) {
		res.callNotFound();
		return;
	}

	res.code(200).send(user);
}

/**
 * @type {RouteHandlerMethod}
 */
async function postUser(req, res) {
	const { body: user } = req;

	const newUser = await usersService.postUser(user);
	console.log(newUser)
	res.code(201).send(newUser);
}

/**
 * @type {RouteHandlerMethod}
 */
async function putUser(req, res) {
	const { body } = req;
}

/**
 * @type {RouteHandlerMethod}
 */
async function deleteUser(req, res) {
	const { id } = req.params;
}

module.exports = {
	getUser,
	getUsers,
	postUser,
	putUser,
	deleteUser
}