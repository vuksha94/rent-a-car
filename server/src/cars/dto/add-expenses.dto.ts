import * as Validator from 'class-validator';

export class AddExpensesDto {
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(4, 1000)
  description: string;

  @Validator.IsNotEmpty()
  @Validator.IsNumber()
  @Validator.IsPositive()
  price: number;
}
