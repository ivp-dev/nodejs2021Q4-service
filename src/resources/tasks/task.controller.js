const tasksService = require('./task.service');

async function getTasks(req, res) {
	const { boardId } = req.params;
	const tasks = await tasksService.getAll(boardId);
	
	res.code(200).send(tasks);
}

async function getTask(req, res) {
	const { boardId, taskId } = req.params;
	const task = await tasksService.getById(boardId, taskId);

	if (!task) {
		res.callNotFound();
		return;
	}

	res.code(200).send(task);
}

async function postTask(req, res) {
	const { body: task } = req;
	const { boardId } = req.params;
	const newTask = await tasksService.addTask(boardId, task);

	res.code(201).send(newTask);
}

async function putTask(req, res) {
	const { body: task } = req;
	const { boardId, taskId } = req.params;
	const updatedTask = await tasksService.updateTask(boardId, taskId, task)

	if (!updatedTask) {
		res.callNotFound();
		return;
	}

	res.code(200).send(updatedTask);
}

/**
 * @type {RouteHandlerMethod}
 */
async function deleteTask(req, res) {
	const { boardId, taskId } = req.params;
	await tasksService.deleteTask(boardId, taskId);

	res.code(204);
}

module.exports = {
	getTask,
	getTasks,
	postTask,
	putTask,
	deleteTask
}