import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
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
import { RentModule } from './rent/rent.module';
import { RentService } from './rent/rent.service';
import { RentController } from './rent/rent.controller';
import { User } from './users/entities/user.entity';
import { Rent } from './rent/entities/rent.entity';
import { Client } from './clients/entities/client.entity';
import { Car } from './cars/entities/car.entity';
import { CarCategory } from './cars/entities/car-category.entity';
import { CarExpense } from './cars/entities/car-expense.entity';
import { CarFuelType } from './cars/entities/car-fuel-type.entity';
import { CarMake } from './cars/entities/car-make.entity';
import { CarModel } from './cars/entities/car-model.entity';
import { CarRegistration } from './cars/entities/car-registration';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: [
    UsersModule,
    CarsModule,
    ClientsModule,
    RentModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfig.hostname,
      port: DatabaseConfig.port,
      username: DatabaseConfig.username,
      password: DatabaseConfig.password,
      database: DatabaseConfig.database,
      entities: [
        User,
        Rent,
        Client,
        Car,
        CarCategory,
        CarExpense,
        CarFuelType,
        CarMake,
        CarModel,
        CarRegistration,
      ],
      synchronize: false,
    }),
    AuthModule,
  ],
  controllers: [
    AppController,
    UsersController,
    CarsController,
    ClientsController,
    RentController,
    AuthController,
  ],
  providers: [
    AppService,
    UsersService,
    CarsService,
    ClientsService,
    RentService,
    AuthService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        UsersController,
        CarsController,
        ClientsController,
        RentController,
      );
  }
}
