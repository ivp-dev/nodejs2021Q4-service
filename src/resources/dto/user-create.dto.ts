import { IsNotEmpty } from 'class-validator';
import { UserDto } from './user.dto';

export class UserCreateDto extends UserDto {
  @IsNotEmpty()
  password?: string;
}