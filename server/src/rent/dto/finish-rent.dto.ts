import * as Validator from 'class-validator';
export class FinishRentDto {
  rentId: number;

  @Validator.IsNotEmpty()
  @Validator.IsNumber()
  @Validator.IsPositive()
  rentFuelFinish: number;

  @Validator.IsNotEmpty()
  @Validator.IsNumber()
  @Validator.IsPositive()
  rentKmFinish: number;
}
