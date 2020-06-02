import * as Validator from 'class-validator';

export class CreateClientDto {
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(8, 10)
  client_id_number: string; // broj licne karte

  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(1, 32)
  @Validator.Matches(/^([a-z]|[ć|ž|č|đ|š]){1,}$/i)
  client_name: string;
}
