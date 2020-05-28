import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Car } from './car.entity';

@Index('cc_name', ['ccName'], { unique: true })
@Entity('car_category', { schema: 'rentacar' })
export class CarCategory {
  @PrimaryGeneratedColumn({ type: 'int', name: 'cc_id' })
  ccId: number;

  @Column('varchar', { name: 'cc_name', unique: true, length: 32 })
  ccName: string;

  @OneToMany(
    () => Car,
    car => car.carCategory,
  )
  cars: Car[];
}
