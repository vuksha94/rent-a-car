export class CreateCarDto {
  carMakeId: number;
  carModelId: number;
  carFuelTypeId: number;
  carCategoryId: number;
  carYear: number;
  carEngineVolume: string;
  carKmDistance?: string;
  carFuelLevel?: string;
}
