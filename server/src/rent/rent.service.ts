import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from 'src/cars/entities/car.entity';
import { Rent } from './entities/rent.entity';
import { RentACar } from 'src/cars/interfaces/rent-a-car.interface';
import { ApiResponse } from 'src/api-response/api-response';
import { FinishRentDto } from './dto/finish-rent.dto';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
    @InjectRepository(Rent)
    private rentRepository: Repository<Rent>,
  ) {}

  async finishRent(finishRentDto: FinishRentDto): Promise<ApiResponse> {
    const apiResponse = new ApiResponse();
    try {
      const rent = await this.rentRepository.findOne(finishRentDto.rentId);
      if (!rent) {
        apiResponse.statusCode = -1002;
        apiResponse.message = "Rent with provided id doesn't exisit!";
      }
      rent.rentKmFinish = finishRentDto.rentKmFinish;
      rent.rentFuelFinish = finishRentDto.rentFuelFinish;
      rent.rentActive = false;
      rent.rentDatetimeTo = new Date();
      const newRent = await this.rentRepository.save(rent);
      const car = await this.carRepository.findOne(rent.rentCarId);

      car.carAvailable = true;
      car.carFuelLevel = finishRentDto.rentFuelFinish;
      car.carKmDist = finishRentDto.rentKmFinish;
      await this.carRepository.save(car);

      apiResponse.data = newRent;
    } catch (err) {
      apiResponse.status = 'error';
      // apiResponse.statusCode = -100;
      console.log(err);
    } finally {
      return Promise.resolve(apiResponse);
    }
  }
  // DONE
  async rentACar(rentACar: RentACar): Promise<ApiResponse> {
    let newRent = new Rent();
    newRent.rentUserId = 1; // ************************************enter id from logged user(admin)
    newRent.rentClientId = rentACar.clientId;
    newRent.rentCarId = rentACar.carId;

    // check if client with provided id exists

    const car = await this.carRepository.findOne(rentACar.carId);

    // set fuel level and km distance before renting => read from selected car
    newRent.rentFuelStart = car.carFuelLevel;
    newRent.rentKmStart = car.carKmDist;

    return new Promise(async resolve => {
      const apiResponse = new ApiResponse();
      this.rentRepository
        .save(newRent)
        .then(async rent => {
          apiResponse.data = rent;
          const car = await this.carRepository.findOne(rentACar.carId);
          car.carAvailable = false;
          await this.carRepository.save(car);
          resolve(apiResponse);
        })
        .catch(err => console.log(err));
    });
  }
}
