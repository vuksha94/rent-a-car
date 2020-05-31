import { Controller, Post, Body, Req } from '@nestjs/common';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { ApiResponse } from 'src/api-response/api-response';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JwtDataUserDto } from './dto/jwt-data-user.dto';
import { Request } from 'express';
import { JwtSecret } from 'config/jwt.secret';
import { LoginResponseDto } from './dto/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('login')
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
    @Req() req: Request,
  ): Promise<ApiResponse> {
    const user = await this.userService.findByEmail(loginUserDto.email);
    const apiResponse = new ApiResponse('success');
    console.log(user);
    if (!user) {
      apiResponse.status = 'error';
      apiResponse.statusCode = -3001;
      apiResponse.message = 'Wrong email!';
      return Promise.resolve(apiResponse);
    }
    const check = await bcrypt.compare(
      loginUserDto.password,
      user.usersPassword,
    );
    if (!check) {
      apiResponse.status = 'error';
      apiResponse.statusCode = -3002;
      apiResponse.message = 'Wrong password!';
      return Promise.resolve(apiResponse);
    }

    // login succes -> create and send back JWT token
    const jwtData = new JwtDataUserDto();
    jwtData.userId = user.usersId;
    jwtData.email = user.usersEmail;
    jwtData.ip = req.ip.toString();
    jwtData.ua = req.headers['user-agent'];
    const token = await jwt.sign({ jwtData }, JwtSecret, { expiresIn: '2d' });
    const responseData = new LoginResponseDto();
    responseData.id = user.usersId;
    responseData.email = user.usersEmail;
    responseData.token = token;
    apiResponse.data = responseData;
    return Promise.resolve(apiResponse);
  }
}
