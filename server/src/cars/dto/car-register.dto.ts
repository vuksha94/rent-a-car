import * as Validator from 'class-validator';

export class CarRegisterDto {
  @Validator.IsNotEmpty()
  carId: number;

  /*@Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(4, 10)
  registrationNumber: string;*/
}
