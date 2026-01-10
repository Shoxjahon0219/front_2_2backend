import { IsArray, IsInt } from "class-validator";

export class AddUsersToFlightDto {
  @IsArray()
  @IsInt({ each: true })
  userIds: number[];
}
