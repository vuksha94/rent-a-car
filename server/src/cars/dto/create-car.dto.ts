import * as Validator from 'class-validator';

export class CreateCarDto {
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(4, 10)
  carRegistrationNumber: string;

  carMakeId: number;
  carModelId: number;
  carFuelTypeId: number;
  carCategoryId: number;

  @Validator.IsNotEmpty()
  carYear: number;

  @Validator.IsNotEmpty()
  carEngineVolume: number;
  carAvailable?: boolean;
  carKmDistance?: number;
  carFuelLevel?: number;
}
