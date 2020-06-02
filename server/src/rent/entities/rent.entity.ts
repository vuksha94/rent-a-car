import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Car } from 'src/cars/entities/car.entity';
import { Client } from 'src/clients/entities/client.entity';
import { User } from 'src/users/entities/user.entity';
import * as Validator from 'class-validator';

@Index('rent_client_id', ['rentClientId'], {})
@Index('rent_car_id', ['rentCarId'], {})
@Index('rent_user_id', ['rentUserId'], {})
@Entity('rent', { schema: 'rentacar' })
export class Rent {
  @PrimaryGeneratedColumn({ type: 'int', name: 'rent_id' })
  rentId: number;

  @Column('int', { name: 'rent_user_id' })
  rentUserId: number;

  @Column('int', { name: 'rent_client_id' })
  rentClientId: number;

  @Column('int', { name: 'rent_car_id' })
  rentCarId: number;

  @Column({ type: 'tinyint', width: 1, name: 'rent_active' })
  rentActive: boolean;

  @Column('datetime', {
    name: 'rent_datetime_from',
    default: () => 'CURRENT_TIMESTAMP',
  })
  rentDatetimeFrom: Date;

  @Column('datetime', { name: 'rent_datetime_to', nullable: true })
  rentDatetimeTo: Date | null;

  @Column({ type: 'decimal', name: 'rent_fuel_start', precision: 10, scale: 2 })
  @Validator.IsNotEmpty()
  @Validator.IsNumber()
  @Validator.IsPositive()
  rentFuelStart: number;

  @Column({
    type: 'decimal',
    name: 'rent_fuel_finish',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  @Validator.IsNotEmpty()
  @Validator.IsNumber()
  @Validator.IsPositive()
  rentFuelFinish: number | null;

  @Column({ type: 'decimal', name: 'rent_km_start', precision: 10, scale: 2 })
  @Validator.IsNotEmpty()
  @Validator.IsNumber()
  @Validator.IsPositive()
  rentKmStart: number;

  @Column({
    type: 'decimal',
    name: 'rent_km_finish',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  @Validator.IsNotEmpty()
  @Validator.IsNumber()
  @Validator.IsPositive()
  rentKmFinish: number | null;

  @ManyToOne(
    () => Car,
    car => car.rents,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  @JoinColumn([{ name: 'rent_car_id', referencedColumnName: 'carId' }])
  rentCar: Car;

  @ManyToOne(
    () => Client,
    client => client.rents,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  @JoinColumn([{ name: 'rent_client_id', referencedColumnName: 'clientId' }])
  rentClient: Client;

  @ManyToOne(
    () => User,
    user => user.rents,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  @JoinColumn([{ name: 'rent_user_id', referencedColumnName: 'usersId' }])
  rentUser: User;
}
