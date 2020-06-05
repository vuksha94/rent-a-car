import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { ApiResponse } from 'src/api-response/api-response';
import { RentService } from './rent.service';
import { FinishRentDto } from './dto/finish-rent.dto';

@Controller('rent')
export class RentController {
  constructor(private rentService: RentService) {}

  @Get()
  findAll() {
    return 'this.carsService.findAll()';
  }
  // finish rent for client
  @Post('finish')
  finishRent(@Body() finishRentDto: FinishRentDto): Promise<ApiResponse> {
    return this.rentService.finishRent(finishRentDto);
  }
  @Get('active/:carId')
  findActiveRent(@Param('carId') carId: number) {
    return this.rentService.findActiveRent(carId);
  }
  // rent a car e.g.POST /cars/rent/115123/120
  @Get('/:carId/:clientId')
  rentACar(
    @Param('carId') carId: number,
    @Param('clientId') clientId: number,
  ): Promise<ApiResponse> {
    return this.rentService.rentACar({ carId, clientId });
  }
}
