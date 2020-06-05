import * as Validator from 'class-validator';
export class FinishRentDto {
  rentId: number;

  @Validator.IsNotEmpty()
  rentFuelFinish: number;

  @Validator.IsNotEmpty()
  rentKmFinish: number;
}
