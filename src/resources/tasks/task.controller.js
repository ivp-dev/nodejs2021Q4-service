const { RouteHandlerMethod } = require('fastify');
const tasksService = require('./task.service');

/**
 * @type {RouteHandlerMethod}
 */
async function getTasks(req, res) {
	const { boardId } = req.params;
	const tasks = await tasksService.getAll(boardId);
	
	res.code(200).send(tasks);
}

/**
 * @type {RouteHandlerMethod}
 */
async function getTask(req, res) {
	const { boardId, taskId } = req.params;
	const task = await tasksService.getById(boardId, taskId);

	if (!task) {
		res.callNotFound();
		return;
	}

	res.code(200).send(task);
}

/**
 * @type {RouteHandlerMethod}
 */
async function postTask(req, res) {
	const { body: task } = req;
	const newTask = await tasksService.addTask(task);

	res.code(201).send(newTask);
}

/**
 * @type {RouteHandlerMethod}
 */
async function putTask(req, res) {
	const { body: task } = req;
	const { taskId } = req.params;
	const updatedTask = await tasksService.updateTask(taskId, task)

	if (!updatedTask) {
		res.callNotFound();
		return;
	}

	return updatedTask;
}

/**
 * @type {RouteHandlerMethod}
 */
async function deleteTask(req, res) {
	const { boardId, taskId } = req.params;
	const result = await tasksService.deleteTask(boardId, taskId);

	if (result <= 0) {
		res.callNotFound();
		return;
	}

	res.code(204);
}

module.exports = {
	getTask,
	getTasks,
	postTask,
	putTask,
	deleteTask
}