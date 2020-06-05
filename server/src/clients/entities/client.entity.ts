import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Rent } from 'src/rent/entities/rent.entity';
import * as Validator from 'class-validator';

@Index('client_id_number', ['clientIdNumber'], { unique: true })
@Entity('client', { schema: 'rentacar' })
export class Client {
  @PrimaryGeneratedColumn({ type: 'int', name: 'client_id' })
  clientId: number;

  @Column('varchar', { name: 'client_id_number', unique: true, length: 9 })
  @Validator.IsNotEmpty()
  @Validator.Length(8, 9)
  clientIdNumber: string;

  @Column('varchar', { name: 'client_name', length: 32 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(1, 32)
  clientName: string;

  @Column('tinyint', {
    name: 'client_available',
    width: 1,
    default: () => "'1'",
  })
  clientAvailable: boolean;

  @OneToMany(
    () => Rent,
    rent => rent.rentClient,
  )
  rents: Rent[];
}
