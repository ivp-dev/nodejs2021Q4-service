import user from './user.schema.json';
import userGet from './user-get.schema.json';
import userPost from './user-post.schema.json';
import task from './task.schema.json';
import taskPost from './task-post.schema.json';
import board from './board.schema.json';
import boardGet from './board-get.schema.json';
import boardPost from './board-post.schema.json';
import column from './column.schema.json';
import columnPost from './column-post.schema.json';
import loginPost from './login-post.schema.json';
import loginGet from './login-get.schema.json';

export const loginSchema = {
  loginPost,
  loginGet
}

export const userSchemas = {
  user,
  userGet,
  userPost,
};

export const taskSchemas = {
  task,
  taskPost,
};

export const boardSchemas = {
  board,
  boardGet,
  boardPost,
};

export const columnSchemas = {
  column,
  columnPost
}
