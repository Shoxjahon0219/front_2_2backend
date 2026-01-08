import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "../../users/entities/user.entity";
// import { User } from "../users/user.entity";

@Entity("flights")
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  flightNum: string;

  @Column()
  departureTime: string;

  @Column()
  arrivalTime: string;

  @Column()
  flightCompany: string;

  @OneToMany(() => User, (user) => user.flight)
  users: User[];
}
