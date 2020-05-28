import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Car } from './car.entity';

@Index('cr_car_id', ['crCarId'], {})
@Entity('car_registration', { schema: 'rentacar' })
export class CarRegistration {
  @PrimaryGeneratedColumn({ type: 'int', name: 'cr_id' })
  crId: number;

  @Column('int', { name: 'cr_car_id' })
  crCarId: number;

  @Column('datetime', { name: 'cr_registration_from' })
  crRegistrationFrom: Date;

  @Column('datetime', { name: 'cr_registration_to' })
  crRegistrationTo: Date;

  @ManyToOne(
    () => Car,
    car => car.carRegistrations,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  @JoinColumn([{ name: 'cr_car_id', referencedColumnName: 'carId' }])
  crCar: Car;
}
