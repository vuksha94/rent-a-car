import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Car } from './car.entity';
import { User } from 'src/users/entities/user.entity';
import * as Validator from 'class-validator';

@Index('ce_user_id', ['ceUserId'], {})
@Index('ce_car_id', ['ceCarId'], {})
@Entity('car_expense', { schema: 'rentacar' })
export class CarExpense {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ce_id' })
  ceId: number;

  @Column('int', { name: 'ce_car_id' })
  ceCarId: number;

  @Column('int', { name: 'ce_user_id' })
  ceUserId: number;

  @Column('varchar', { name: 'ce_description', length: 64 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(4, 1000)
  ceDescription: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'ce_price' })
  @Validator.IsNotEmpty()
  @Validator.IsNumber()
  @Validator.IsPositive()
  cePrice: number;

  @Column('datetime', { name: 'ce_date' })
  ceDate: Date;

  @ManyToOne(
    () => Car,
    car => car.carExpenses,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  @JoinColumn([{ name: 'ce_car_id', referencedColumnName: 'carId' }])
  ceCar: Car;

  @ManyToOne(
    () => User,
    user => user.carExpenses,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  @JoinColumn([{ name: 'ce_user_id', referencedColumnName: 'usersId' }])
  ceUser: User;
}
