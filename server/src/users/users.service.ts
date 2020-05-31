import { Injectable } from '@nestjs/common';
import { LoginUser } from './interfaces/login-user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepositiry: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepositiry.find();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepositiry.findOne({
      where: { usersEmail: email },
    });
  }
}
