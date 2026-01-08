import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Flight } from "../../flight/entities/flight.entity";
// import { Flight } from "../flights/flight.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  country: string;

  @ManyToOne(() => Flight, (flight) => flight.users, {
    onDelete: "SET NULL",
  })
  flight: Flight;
}
