const usersService = require('./user.service');

async function getUsers(req, res) {
	const users = await usersService.getAll();
	// map user fields to exclude secret fields like "password"
	res.code(200).send(users);
}

async function getUser(req, res) {
	const { userId } = req.params;
	const user = await usersService.getById(userId);

	if (!user) {
		res.callNotFound();
		return;
	}

	res.code(200).send(user);
}

async function postUser(req, res) {
	const { body: user } = req;
	const newUser = await usersService.addUser(user);
	res.code(201).send(newUser);
}

async function putUser(req, res) {
	const { body: user } = req;
	const { userId } = req.params;
	const updatedUser = await usersService.updateUser(userId, user)

	if (!updatedUser) {
		res.callNotFound();
		return;
	}

	res.code(200).send(updatedUser);
}

/**
 * @type {RouteHandlerMethod}
 */
async function deleteUser(req, res) {
	const { userId } = req.params;

	await usersService.deleteUser(userId);

	res.code(204);
}

module.exports = {
	getUser,
	getUsers,
	postUser,
	putUser,
	deleteUser
}