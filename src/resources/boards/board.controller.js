const boardsService = require('./board.service');

async function getBoards(req, res) {
	const boards = await boardsService.getAll();

	res.code(200).send(boards);
}

async function getBoard(req, res) {
	const { boardId } = req.params;
	const board = await boardsService.getById(boardId);

	if (!board) {
		res.callNotFound();
		return;
	}

	res.code(200).send(board);
}

async function postBoard(req, res) {
	const { body: board } = req;
	const newboard = await boardsService.addBoard(board);
	res.code(201).send(newboard);
}

async function putBoard(req, res) {
	const { body: board } = req;
	const { boardId } = req.params;
	const updatedboard = await boardsService.updateBoard(boardId, board)

	if (!updatedboard) {
		res.callNotFound();
		return;
	}

  res.code(200).send(updatedboard);
}

/**
 * @type {RouteHandlerMethod}
 */
async function deleteBoard(req, res) {
	const { boardId } = req.params;

	await boardsService.deleteBoard(boardId);
	res.code(204);
}

module.exports = {
	getBoard,
	getBoards,
	postBoard,
	putBoard,
	deleteBoard
}