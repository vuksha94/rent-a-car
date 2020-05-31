import {
  NestMiddleware,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtSecret } from 'config/jwt.secret';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';
import { JwtDataUserDto } from 'src/auth/dto/jwt-data-user.dto';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
    }
    let token = authorizationHeader.toString().split(' ')[1];
    try {
      const jwtData: JwtDataUserDto = <JwtDataUserDto>(
        jwt.verify(token, JwtSecret)
      );
      if (jwtData.ip !== req.ip) {
        throw new HttpException('Token not valid', HttpStatus.UNAUTHORIZED);
      }
      if (jwtData.ua !== req.headers['user-agent']) {
        throw new HttpException('Token not valid', HttpStatus.UNAUTHORIZED);
      }
    } catch (err) {
      throw new HttpException('Token not valid', HttpStatus.UNAUTHORIZED);
    }

    next();
  }
}
