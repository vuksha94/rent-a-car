import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { AddExpensesDto } from './dto/add-expenses.dto';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  // get all cars
  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  // details for selected car with :id + sum of all expenses +  list of all clients that have rented a selected car
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(id);
  }

  // create new car
  @Post()
  createCar(@Body() createCarDto: CreateCarDto) {
    return this.carsService.createCar(createCarDto);
  }

  // rent a car e.g.POST /cars/rent/115123/120
  @Post('rent/:carId/:clientId')
  rentACar(@Param('carId') carId: string, @Param('clientId') clientId: string) {
    return this.carsService.rentACar({ carId, clientId });
  }

  // add expenses for car
  @Post('expenses/:carId')
  addExpenses(
    @Body() addExpensesDto: AddExpensesDto,
    @Param('carId') carId: string,
  ) {
    const { description, price } = addExpensesDto;

    return this.carsService.addCarExpenses({ description, price, carId });
  }
}
