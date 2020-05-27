import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { CarsController } from './cars/cars.controller';
import { CarsModule } from './cars/cars.module';
import { CarsService } from './cars/cars.service';
import { ClientsController } from './clients/clients.controller';
import { ClientsService } from './clients/clients.service';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from 'config/database.config';
import { Users } from './users/entities/users.entity';

@Module({
  imports: [
    UsersModule,
    CarsModule,
    ClientsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfig.hostname,
      port: DatabaseConfig.port,
      username: DatabaseConfig.username,
      password: DatabaseConfig.password,
      database: DatabaseConfig.database,
      entities: [Users],
      synchronize: true,
    }),
  ],
  controllers: [
    AppController,
    UsersController,
    CarsController,
    ClientsController,
  ],
  providers: [AppService, UsersService, CarsService, ClientsService],
})
export class AppModule {}
