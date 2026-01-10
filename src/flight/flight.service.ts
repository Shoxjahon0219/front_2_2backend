import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreateFlightDto } from "./dto/create-flight.dto";
import { UpdateFlightDto } from "./dto/update-flight.dto";
import { Flight } from "./entities/flight.entity";
import { User } from "../users/entities/user.entity";

@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(Flight)
    private readonly flightRepo: Repository<Flight>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  // CREATE FLIGHT
  create(dto: CreateFlightDto) {
    const flight = this.flightRepo.create(dto);
    return this.flightRepo.save(flight);
  }

  // GET ALL FLIGHTS
  findAll() {
    return this.flightRepo.find({
      relations: ["users"],
    });
  }

  // GET ONE FLIGHT
  async findOne(id: number) {
    const flight = await this.flightRepo.findOne({
      where: { id },
      relations: ["users"],
    });

    if (!flight) {
      throw new NotFoundException("Flight not found");
    }

    return flight;
  }

  // UPDATE FLIGHT
  async update(id: number, dto: UpdateFlightDto) {
    const flight = await this.findOne(id);
    Object.assign(flight, dto);
    return this.flightRepo.save(flight);
  }

  // DELETE FLIGHT
  async remove(id: number) {
    const flight = await this.findOne(id);
    return this.flightRepo.remove(flight);
  }

  async addUsersToFlight(flightId: number, userIds: number[]) {
    const flight = await this.flightRepo.findOne({
      where: { id: flightId },
      relations: ["users"],
    });

    if (!flight) throw new NotFoundException("Flight not found");

    const users = await this.userRepo.findBy({
      id: In(userIds),
    });

    // 👇 добавляем, не перетирая старых
    flight.users = [...flight.users, ...users];

    return this.flightRepo.save(flight);
  }
}
