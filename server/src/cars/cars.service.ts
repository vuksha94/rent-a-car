import { Injectable } from '@nestjs/common';
import { CreateCar } from './interfaces/create-car.interface';
import { RentACar } from './interfaces/rent-a-car.interface';
import { AddExpenses } from './interfaces/add-expenses.interface';

@Injectable()
export class CarsService {
  findAll() {
    return 'Find all cars';
  }

  findOne(id: string) {
    return `Car number ${id}`;
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
