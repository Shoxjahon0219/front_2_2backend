import { Module } from "@nestjs/common";
import { FlightsService } from "./flight.service";
import { FlightController } from "./flight.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Flight } from "./entities/flight.entity";
import { User } from "../users/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Flight, User])],

  controllers: [FlightController],
  providers: [FlightsService],
})
export class FlightModule {}
