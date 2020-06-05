import { ClientType } from "../ClientType";
import { Car } from "./CarResponseType";

export interface RentData {
  rentId?: number;
  rentDatetimeFrom?: Date;
  rentFuelStart?: string;
  rentFuelFinish?: string;
  rentKmStart?: string;
  rentKmFinish?: string;
  rentCar?: Car;
  rentClient?: ClientType;
}
