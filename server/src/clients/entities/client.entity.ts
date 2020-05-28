import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Rent } from 'src/rent/entities/rent.entity';

@Index('client_id_number', ['clientIdNumber'], { unique: true })
@Entity('client', { schema: 'rentacar' })
export class Client {
  @PrimaryGeneratedColumn({ type: 'int', name: 'client_id' })
  clientId: number;

  @Column('varchar', { name: 'client_id_number', unique: true, length: 9 })
  clientIdNumber: string;

  @Column('varchar', { name: 'client_name', length: 32 })
  clientName: string;

  @OneToMany(
    () => Rent,
    rent => rent.rentClient,
  )
  rents: Rent[];
}
