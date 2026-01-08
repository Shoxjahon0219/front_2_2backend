import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateFlightDto {
  @ApiProperty({ example: "HY-101" })
  @IsString()
  @IsNotEmpty()
  flightNum: string;

  @ApiProperty({ example: "10:30" })
  @IsString()
  @IsNotEmpty()
  departureTime: string;

  @ApiProperty({ example: "13:45" })
  @IsString()
  @IsNotEmpty()
  arrivalTime: string;

  @ApiProperty({ example: "Uzbekistan Airways" })
  @IsString()
  @IsNotEmpty()
  flightCompany: string;
}
