import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarMake } from './entities/car-make.entity';
import { CarModel } from './entities/car-model.entity';
import { Car } from './entities/car.entity';
import { CarCategory } from './entities/car-category.entity';
import { CarExpense } from './entities/car-expense.entity';
import { CarRegistration } from './entities/car-registration';
import { CarFuelType } from './entities/car-fuel-type.entity';
import { RentModule } from 'src/rent/rent.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Car,
      CarMake,
      CarModel,
      CarCategory,
      CarExpense,
      CarRegistration,
      CarFuelType,
    ]),
    RentModule,
  ],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [TypeOrmModule],
})
export class CarsModule {}
