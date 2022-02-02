import { Task } from '../../types';

export class UserDto {
  id?: string;

  name?: string;

  login?: string;

  password?: string;

  tasks?: Task[];
}
