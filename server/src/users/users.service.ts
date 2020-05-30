import { Injectable } from '@nestjs/common';
import { LoginUser } from './interfaces/login-user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
//import * as jsonwebtoken from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepositiry: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepositiry.find();
  }

  async loginUser(loginUser: LoginUser) {
    const user = await this.usersRepositiry.findOne({
      where: { usersEmail: loginUser.email },
    });
    if (user === undefined) {
      return 'nema';
    }
    /*const jwt = require('jsonwebtoken');
    user = await jwt.sign('token', 'secret', (err, user) => {
      if (err) console.log(err);
      console.log(user);
      return user;
    });*/
  }
}
