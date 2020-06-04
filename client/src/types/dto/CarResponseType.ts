export interface Car {
  carId: number;
  carRegistrationNumber: string;
  carYear: number;
  carEngineVolume: number;
  carAvailable: boolean;
  carKmDist: number;
  carFuelLevel: number;
  carMake: CarMake;
  carModel: CarModel;
  carCategory: CarCategory;
  carFuelType: CarFuelType;
}

export interface CarMake {
  cmId: number;
  cmName: string;
}
export interface CarModel {
  cmId: number;
  cmName: string;
  cmCmId?: number;
}
export interface CarCategory {
  ccId: number;
  ccName: string;
}
export interface CarFuelType {
  cftId: number;
  cftName: string;
}
