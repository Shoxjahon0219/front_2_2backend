import { IsString, IsInt, IsOptional, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "Alex" })
  @IsString()
  name: string;

  @ApiProperty({ example: 22 })
  @IsInt()
  @Min(1)
  age: number;

  @ApiProperty({ example: "USA" })
  @IsString()
  country: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  flightId?: number;
}
