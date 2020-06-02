import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { AddExpensesDto } from './dto/add-expenses.dto';
import { Rent } from 'src/rent/entities/rent.entity';
import { CarExpense } from './entities/car-expense.entity';
import { Car } from './entities/car.entity';
import { CarModel } from './entities/car-model.entity';
import { ApiResponse } from 'src/api-response/api-response';
import { CarRegisterDto } from './dto/car-register.dto';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  // get all cars
  @Get()
  findAll(): Promise<ApiResponse> {
    return this.carsService.findAll();
  }

  // get all car models
  @Get('models')
  findAllModels(): Promise<CarModel[]> {
    return this.carsService.findAllModels();
  }

  // get car model with given id DONE
  @Get('models/:id')
  findModel(@Param('id') id: string) {
    return this.carsService.findModel(id);
  }

  @Get('available')
  findAvailableCars() {
    return this.carsService.findAvailableCars();
  }

  /**
   * details for selected car with :id + sum of all expenses +
   * list of all clients that have rented a selected car
   *
   *  */

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ApiResponse> {
    return this.carsService.findOne(id);
  }

  // create new car
  @Post()
  createCar(@Body() createCarDto: CreateCarDto): Promise<ApiResponse> {
    return this.carsService.createCar(createCarDto);
  }

  // add expenses for car
  @Post('expenses/:carId')
  addExpenses(
    @Body() addExpensesDto: AddExpensesDto,
    @Param('carId') carId: number,
  ): Promise<ApiResponse> {
    const { description, price } = addExpensesDto;
    return this.carsService.addCarExpenses({ description, price, carId });
  }

  @Post('register')
  registerCar(@Body() carRegisterDto: CarRegisterDto) {
    return this.carsService.registerCar(carRegisterDto);
  }
}
