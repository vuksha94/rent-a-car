import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Car } from './car.entity';
import { CarMake } from './car-make.entity';

@Index('cm_cm_id', ['cmCmId'], {})
@Entity('car_model', { schema: 'rentacar' })
export class CarModel {
  @PrimaryGeneratedColumn({ type: 'int', name: 'cm_id' })
  cmId: number;

  @Column('varchar', { name: 'cm_name', length: 32 })
  cmName: string;

  @Column('int', { name: 'cm_cm_id' })
  cmCmId: number;

  @OneToMany(
    () => Car,
    car => car.carModel,
  )
  cars: Car[];

  @ManyToOne(
    () => CarMake,
    carMake => carMake.carModels,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  @JoinColumn([{ name: 'cm_cm_id', referencedColumnName: 'cmId' }])
  cmCm: CarMake;
}
