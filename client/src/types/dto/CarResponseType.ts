import { RentData } from "./RentDataResponse";
import { ClientType } from "../ClientType";

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
  carRegistrations: CarRegistration[];
  isRegistered?: boolean;
  carExpenses?: CarExpense[];
  rents?: RentData[];
  clients?: ClientType[];
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
export interface CarRegistration {
  crId: number;
  crCarId: number;
  crRegistrationFrom: string;
  crRegistrationTo: string;
}
export interface CarExpense {
  ceId: number;
  ceCarId: number;
  ceUserId: number;
  ceDescription: string;
  cePrice: string;
  ceDate: string;
}
