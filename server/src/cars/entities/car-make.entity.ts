import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from './car.entity';
import { CarModel } from './car-model.entity';

@Entity('car_make', { schema: 'rentacar' })
export class CarMake {
  @PrimaryGeneratedColumn({ type: 'int', name: 'cm_id' })
  cmId: number;

  @Column('varchar', { name: 'cm_name', length: 32 })
  cmName: string;

  @OneToMany(
    () => Car,
    car => car.carMake,
  )
  cars: Car[];

  @OneToMany(
    () => CarModel,
    carModel => carModel.cmCm,
  )
  carModels: CarModel[];
}
