import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentController } from './rent.controller';
import { RentService } from './rent.service';
import { Rent } from './entities/rent.entity';
import { Car } from 'src/cars/entities/car.entity';
import { Client } from 'src/clients/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rent, Car, Client])],
  controllers: [RentController],
  providers: [RentService],
  exports: [TypeOrmModule],
})
export class RentModule {}
