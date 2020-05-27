import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn({ name: 'users_id', type: 'int' })
  usersId: number;

  @Column({ name: 'users_email', type: 'varchar', length: 64, unique: true })
  usersEmail: string;

  @Column({ name: 'users_password', type: 'varchar', length: 250 })
  usersPassword: string;

  @Column({ name: 'users_name', type: 'varchar', length: 32 })
  usersName: string;

  @Column({ name: 'users_role', type: 'tinyint', width: 1 })
  usersRole: number;
}
