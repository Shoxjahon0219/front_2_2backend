import { Module } from "@nestjs/common";
import { FlightModule } from "./flight/flight.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: +!process.env.DBPORT,
      username: process.env.DBUSERNAME,
      password: process.env.DBPASSWORD,
      database: process.env.DBNAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    FlightModule,
    UsersModule,
  ],
})
export class AppModule {}
