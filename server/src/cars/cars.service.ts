import { Injectable } from '@nestjs/common';
import { CreateCar } from './interfaces/create-car.interface';
import { RentACar } from './interfaces/rent-a-car.interface';
import { AddExpenses } from './interfaces/add-expenses.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { CarModel } from './entities/car-model.entity';
import { Repository } from 'typeorm';
import { CarMake } from './entities/car-make.entity';
import { Car } from './entities/car.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { Rent } from 'src/rent/entities/rent.entity';
import { CarExpense } from './entities/car-expense.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
    @InjectRepository(CarModel)
    private carModelRepository: Repository<CarModel>,
    @InjectRepository(CarExpense)
    private carExpenseRepository: Repository<CarExpense>,
    @InjectRepository(Rent)
    private rentRepository: Repository<Rent>,
  ) {}

  // DONE
  findAll(): Promise<Car[]> {
    return this.carRepository.find();
  }

  // DONE
  findOne(id: string): Promise<Car> {
    return this.carRepository.findOne(id);
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
  createCar(createCar: CreateCar): Promise<Car> {
    let newCar = new Car();
    newCar.carMakeId = createCar.carMakeId;
    newCar.carModelId = createCar.carModelId;
    newCar.carFuelTypeId = createCar.carFuelTypeId;
    newCar.carCategoryId = createCar.carCategoryId;
    newCar.carYear = createCar.carYear;
    newCar.carEngineVolume = createCar.carEngineVolume;
    newCar.carAvailable = createCar.carAvailable;
    newCar.carKmDist = createCar.carKmDistance;
    newCar.carFuelLevel = createCar.carFuelLevel;

    return this.carRepository.save(newCar);
  }

  // DONE
  async rentACar(rentACar: RentACar): Promise<Rent> {
    let newRent = new Rent();
    newRent.rentUserId = 1; // ************************************enter id from logged user(admin)
    newRent.rentClientId = rentACar.clientId;
    newRent.rentCarId = rentACar.carId;

    const car = await this.carRepository.findOne(rentACar.carId);
    // set fuel level and km distance before renting => read from selected car
    newRent.rentFuelStart = car.carFuelLevel;
    newRent.rentKmStart = car.carKmDist;

    return this.rentRepository.save(newRent);
  }

  // DONE
  addCarExpenses(addExpenses: AddExpenses): Promise<CarExpense> {
    let newExpense = new CarExpense();
    newExpense.ceUserId = 1; // ****************************************enter id from logged user(admin)
    newExpense.ceCarId = addExpenses.carId;
    newExpense.ceDescription = addExpenses.description;
    newExpense.cePrice = addExpenses.price;
    return this.carExpenseRepository.save(newExpense);
  }
}
