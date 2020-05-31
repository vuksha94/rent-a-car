import {
  NestMiddleware,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtSecret } from 'config/jwt.secret';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
    }
    let token = authorizationHeader.toString().split(' ')[1];
    try {
      jwt.verify(token, JwtSecret);
    } catch (err) {
      throw new HttpException('Token not valid', HttpStatus.UNAUTHORIZED);
    }

    next();
  }
}
