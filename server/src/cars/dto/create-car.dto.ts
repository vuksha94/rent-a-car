export class CreateCarDto {
  carRegistrationNumber: string;
  carMakeId: number;
  carModelId: number;
  carFuelTypeId: number;
  carCategoryId: number;
  carYear: number;
  carEngineVolume: string;
  carAvailable?: boolean;
  carKmDistance?: string;
  carFuelLevel?: string;
}
