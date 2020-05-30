import { Injectable } from '@nestjs/common';
import { CreateCar } from './interfaces/create-car.interface';
import { AddExpenses } from './interfaces/add-expenses.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { CarModel } from './entities/car-model.entity';
import { Repository } from 'typeorm';
import { CarMake } from './entities/car-make.entity';
import { Car } from './entities/car.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { CarExpense } from './entities/car-expense.entity';
import { ApiResponse } from 'src/api-response/api-response';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
    @InjectRepository(CarModel)
    private carModelRepository: Repository<CarModel>,
    @InjectRepository(CarExpense)
    private carExpenseRepository: Repository<CarExpense>,
  ) {}

  // DONE
  findAll(): Promise<ApiResponse> {
    return new Promise(async resolve => {
      const apiResponse = new ApiResponse();
      apiResponse.data = await this.carRepository.find();
      resolve(apiResponse);
    });
  }

  // DONE
  findOne(id: string): Promise<ApiResponse> {
    const apiResponse = new ApiResponse();
    return new Promise(async resolve => {
      const car = await this.carRepository.findOne(id);
      if (car === undefined) {
        apiResponse.status = 'error';
        apiResponse.statusCode = -1002;
        apiResponse.message = "Car with provided id doesn't exisit";
      } else {
        apiResponse.data = car;
      }
      resolve(apiResponse);
    });
  }

  // DONE
  findAvailableCars(): Promise<Car[]> {
    return this.carRepository.find({ where: { carAvailable: true } });
  }

  // DONE
  findAllModels(): Promise<CarModel[]> {
    return this.carModelRepository.find();
  }
  // DONE
  findModel(id: string): Promise<CarModel> {
    return this.carModelRepository.findOne(id, { relations: ['cmCm'] });
  }

  // DONE
  createCar(createCar: CreateCarDto): Promise<ApiResponse> {
    let newCar = new Car();
    newCar.carRegistrationNumber = createCar.carRegistrationNumber;
    newCar.carMakeId = createCar.carMakeId;
    newCar.carModelId = createCar.carModelId;
    newCar.carFuelTypeId = createCar.carFuelTypeId;
    newCar.carCategoryId = createCar.carCategoryId;
    newCar.carYear = createCar.carYear;
    newCar.carEngineVolume = createCar.carEngineVolume;
    newCar.carAvailable = createCar.carAvailable;
    newCar.carKmDist = createCar.carKmDistance;
    newCar.carFuelLevel = createCar.carFuelLevel;

    return new Promise(resolve => {
      const apiResponse = new ApiResponse();
      this.carRepository
        .save(newCar)
        .then(car => {
          apiResponse.data = car;
          resolve(apiResponse);
        })
        .catch(err => {
          apiResponse.status = 'error';
          apiResponse.statusCode = -1003;
          apiResponse.message = 'Registration number already taken';
          //apiResponse.data = err;
          resolve(apiResponse);
        });
    });
  }

  // DONE
  addCarExpenses(addExpenses: AddExpenses): Promise<ApiResponse> {
    let newExpense = new CarExpense();
    newExpense.ceUserId = 1; // ****************************************enter id from logged user(admin)
    newExpense.ceCarId = addExpenses.carId;
    newExpense.ceDescription = addExpenses.description;
    newExpense.cePrice = addExpenses.price;
    return new Promise(async resolve => {
      const apiResponse = new ApiResponse();
      apiResponse.data = this.carExpenseRepository.save(newExpense);
      resolve(apiResponse);
    });
  }
}
