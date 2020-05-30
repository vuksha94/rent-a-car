import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarExpense } from 'src/cars/entities/car-expense.entity';
import { Rent } from 'src/rent/entities/rent.entity';

@Index('user_email_unique', ['usersEmail'], { unique: true })
@Entity('user', { schema: 'rentacar' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'users_id' })
  usersId: number;

  @Column('varchar', { name: 'users_email', unique: true, length: 64 })
  usersEmail: string;

  @Column('varchar', { name: 'users_password', length: 250 })
  usersPassword: string;

  @Column('varchar', { name: 'users_name', length: 32 })
  usersName: string;

  @Column('tinyint', { name: 'users_role', width: 1 })
  usersRole: boolean;

  @OneToMany(
    () => CarExpense,
    carExpense => carExpense.ceUser,
  )
  carExpenses: CarExpense[];

  @OneToMany(
    () => Rent,
    rent => rent.rentUser,
  )
  rents: Rent[];
}
