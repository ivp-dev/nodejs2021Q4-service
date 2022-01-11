import { EntitySchema } from 'typeorm';
import { TaskModel } from '../../types';

const taskEntity = new EntitySchema<TaskModel>({
  name: 'task',
  columns: {
    id: {
      type: 'uuid',
      name: 'id',
      primary: true,
      generated: true
    },
    boardId: {
      name: 'board_id',
      type: 'string',
    },
    userId: {
      name: 'user_id',
      type: 'string',
    },
    columnId: {
      name: 'column_id',
      type: 'string',
    },
    title: {
      name: 'title',
      type: 'string',
    }
  }
})

export default taskEntity;