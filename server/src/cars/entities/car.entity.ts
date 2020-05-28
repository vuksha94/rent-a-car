import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarMake } from './car-make.entity';
import { CarModel } from './car-model.entity';
import { CarCategory } from './car-category.entity';
import { CarFuelType } from './car-fuel-type.entity';
import { CarExpense } from './car-expense.entity';
import { CarRegistration } from './car-registration';
import { Rent } from 'src/rent/entities/rent.entity';

@Index('car_make', ['carMakeId'], {})
@Index('car_model', ['carModelId'], {})
@Index('car_category_id', ['carCategoryId'], {})
@Index('car_fuel_type_id', ['carFuelTypeId'], {})
@Entity('car', { schema: 'rentacar' })
export class Car {
  @PrimaryGeneratedColumn({ type: 'int', name: 'car_id' })
  carId: number;

  @Column('int', { name: 'car_make_id' })
  carMakeId: number;

  @Column('int', { name: 'car_model_id' })
  carModelId: number;

  @Column('int', { name: 'car_fuel_type_id' })
  carFuelTypeId: number;

  @Column('int', { name: 'car_category_id' })
  carCategoryId: number;

  @Column('int', { name: 'car_year' })
  carYear: number;

  @Column('decimal', { name: 'car_engine_volume', precision: 10, scale: 2 })
  carEngineVolume: string;

  @Column('tinyint', { name: 'car_available', width: 1, default: () => "'1'" })
  carAvailable: boolean;

  @Column('decimal', {
    name: 'car_km_dist',
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  carKmDist: string;

  @Column('decimal', {
    name: 'car_fuel_level',
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  carFuelLevel: string;

  @ManyToOne(
    () => CarMake,
    carMake => carMake.cars,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  @JoinColumn([{ name: 'car_make_id', referencedColumnName: 'cmId' }])
  carMake: CarMake;

  @ManyToOne(
    () => CarModel,
    carModel => carModel.cars,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  @JoinColumn([{ name: 'car_model_id', referencedColumnName: 'cmId' }])
  carModel: CarModel;

  @ManyToOne(
    () => CarCategory,
    carCategory => carCategory.cars,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  @JoinColumn([{ name: 'car_category_id', referencedColumnName: 'ccId' }])
  carCategory: CarCategory;

  @ManyToOne(
    () => CarFuelType,
    carFuelType => carFuelType.cars,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  @JoinColumn([{ name: 'car_fuel_type_id', referencedColumnName: 'cftId' }])
  carFuelType: CarFuelType;

  @OneToMany(
    () => CarExpense,
    carExpense => carExpense.ceCar,
  )
  carExpenses: CarExpense[];

  @OneToMany(
    () => CarRegistration,
    carRegistration => carRegistration.crCar,
  )
  carRegistrations: CarRegistration[];

  @OneToMany(
    () => Rent,
    rent => rent.rentCar,
  )
  rents: Rent[];
}
