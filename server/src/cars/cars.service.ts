import { Injectable } from '@nestjs/common';
import { CreateCar } from './interfaces/create-car.interface';
import { RentACar } from './interfaces/rent-a-car.interface';
import { AddExpenses } from './interfaces/add-expenses.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { CarModel } from './entities/car-model.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(CarModel)
    private carModelRepository: Repository<CarModel>,
  ) {}
  findAll() {
    return 'Find all cars';
  }

  findOne(id: string) {
    return `Car number ${id}`;
  }

  findAllModels() {
    return this.carModelRepository.find();
  }
  findModel(id: string) {
    return this.carModelRepository.findOne(id);
  }

  createCar(createCar: CreateCar) {
    return createCar;
  }

  rentACar(rentACar: RentACar) {
    return rentACar;
  }

  addCarExpenses(addExpenses: AddExpenses) {
    return addExpenses;
  }
}
