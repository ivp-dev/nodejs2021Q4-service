const { RouteHandlerMethod } = require('fastify');
const boardsService = require('./board.service');

/**
 * @type {RouteHandlerMethod}
 */
async function getBoards(req, res) {
	const boards = await boardsService.getAll();

	res.code(200).send(boards);
}

/**
 * @type {RouteHandlerMethod}
 */
async function getBoard(req, res) {
	const { boardId } = req.params;
	const board = await boardsService.getById(boardId);

	if (!board) {
		res.callNotFound();
		return;
	}

	res.code(200).send(board);
}

/**
 * @type {RouteHandlerMethod}
 */
async function postBoard(req, res) {
	const { body: board } = req;
	const newboard = await boardsService.addBoard(board);
	res.code(201).send(newboard);
}

/**
 * @type {RouteHandlerMethod}
 */
async function putBoard(req, res) {
	const { body: board } = req;
	const { boardId } = req.params;
	const updatedboard = await boardsService.updateBoard(boardId, board)

	if (!updatedboard) {
		res.callNotFound();
		return;
	}

	return updatedboard;
}

/**
 * @type {RouteHandlerMethod}
 */
async function deleteBoard(req, res) {
	const { boardId } = req.params;
	const result = await boardsService.deleteBoard(boardId);

	if (result <= 0) {
		res.callNotFound();
		return;
	}

	res.code(204);
}

module.exports = {
	getBoard,
	getBoards,
	postBoard,
	putBoard,
	deleteBoard
}