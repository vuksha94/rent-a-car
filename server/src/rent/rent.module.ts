import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentController } from './rent.controller';
import { RentService } from './rent.service';
import { Rent } from './entities/rent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rent])],
  controllers: [RentController],
  providers: [RentService],
  exports: [TypeOrmModule],
})
export class RentModule {}
