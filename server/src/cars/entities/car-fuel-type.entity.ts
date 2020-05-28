import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Car } from './car.entity';

@Index('cft_name', ['cftName'], { unique: true })
@Entity('car_fuel_type', { schema: 'rentacar' })
export class CarFuelType {
  @PrimaryGeneratedColumn({ type: 'int', name: 'cft_id' })
  cftId: number;

  @Column('varchar', { name: 'cft_name', unique: true, length: 32 })
  cftName: string;

  @OneToMany(
    () => Car,
    car => car.carFuelType,
  )
  cars: Car[];
}
