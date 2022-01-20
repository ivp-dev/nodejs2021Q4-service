import { FastifyRequest, FastifyReply } from 'fastify';
import TaskEntity from './task.entity';
import * as tasksService from './task.service';

/**
 * Get all tasks route controller
 * @param req - Fastify request
 * @param res - Festify reply
 * @returns Promise void
 */
export async function getTasks(
  req: FastifyRequest<{ Params: { boardId: string } }>,
  res: FastifyReply
): Promise<void> {
  const { boardId } = req.params;
  const tasks = await tasksService.getAll(boardId);

  res.code(200).send(tasks);
}

/**
 * Get task route controller
 * @param req - Fastify request
 * @param res - Festify reply
 * @returns Promise void
 */
export async function getTask(
  req: FastifyRequest<{ Params: { boardId: string; taskId: string } }>,
  res: FastifyReply
): Promise<void> {
  const { boardId, taskId } = req.params;
  const task = await tasksService.getById(boardId, taskId);

  if (!task) {
    res.code(404).send('Not Found');
    return;
  }

  res.code(200).send(task);
}

/**
 * Add task route controller
 * @param req - Fastify request
 * @param res - Festify reply
 * @returns Promise void
 */
export async function postTask(
  req: FastifyRequest<{ Params: { boardId: string }; Body: TaskEntity }>,
  res: FastifyReply
): Promise<void> {
  const { body: task } = req;
  const { boardId } = req.params;
  const newTask = await tasksService.addTask(boardId, task);

  res.code(201).send(newTask);
}

/**
 * Update task route controller
 * @param req - Fastify request
 * @param res - Festify reply
 * @returns Promise void
 */
export async function putTask(
  req: FastifyRequest<{
    Params: { boardId: string; taskId: string };
    Body: TaskEntity;
  }>,
  res: FastifyReply
): Promise<void> {
  const { body: task } = req;
  const { boardId, taskId } = req.params;
  const updatedTask = await tasksService.updateTask(boardId, taskId, task);

  if (!updatedTask) {
    res.code(404).send('Not Found');
    return;
  }

  res.code(200).send(updatedTask);
}

/**
 * Delete task route controller
 * @param req - Fastify request
 * @param res - Festify reply
 * @returns Promise void
 */
export async function deleteTask(
  req: FastifyRequest<{ Params: { boardId: string; taskId: string } }>,
  res: FastifyReply
): Promise<void> {
  const { boardId, taskId } = req.params;
  await tasksService.deleteTask(boardId, taskId);

  res.code(204);
}