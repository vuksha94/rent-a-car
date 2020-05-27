import { Injectable } from '@nestjs/common';
import { LoginUser } from './interfaces/login-user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepositiry: Repository<Users>,
  ) {}

  findAll(): Promise<Users[]> {
    return this.usersRepositiry.find();
  }

  loginUser(loginUser: LoginUser) {
    return `Login user: ${loginUser.email}`;
  }
}
