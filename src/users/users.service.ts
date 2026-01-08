import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Flight } from "../flight/entities/flight.entity";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Flight)
    private readonly flightRepo: Repository<Flight>
  ) {}

  // CREATE USER
  async create(dto: CreateUserDto) {
    let flight;

    if (dto.flightId) {
      flight = await this.flightRepo.findOne({
        where: { id: dto.flightId },
      });

      if (!flight) {
        throw new NotFoundException("Flight not found");
      }
    }

    const user = this.userRepo.create({
      name: dto.name,
      age: dto.age,
      country: dto.country,
      flight,
    });

    return this.userRepo.save(user);
  }

  // GET ALL USERS
  findAll() {
    return this.userRepo.find({
      relations: ["flight"],
    });
  }

  // GET ONE USER
  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ["flight"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  // UPDATE USER
  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (dto.flightId) {
      const flight = await this.flightRepo.findOne({
        where: { id: dto.flightId },
      });

      if (!flight) {
        throw new NotFoundException("Flight not found");
      }

      user.flight = flight;
    }

    Object.assign(user, dto);

    return this.userRepo.save(user);
  }

  // DELETE USER
  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepo.remove(user);
  }
}
