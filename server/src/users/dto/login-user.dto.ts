import * as Validator from 'class-validator';
export class LoginUserDto {
  @Validator.IsNotEmpty()
  @Validator.IsEmail()
  email: string;

  @Validator.IsNotEmpty()
  password: string;
}
