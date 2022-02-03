import { AutoMap } from "@automapper/classes";

export class BaseDto {
  @AutoMap()
  id?: string
}