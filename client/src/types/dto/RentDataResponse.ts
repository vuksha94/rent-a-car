import { ClientType } from "../ClientType";
import { Car } from "./CarResponseType";

export interface RentData {
  rentId?: number;
  rentClientId?: number;
  rentDatetimeFrom?: Date;
  rentDatetimeTo?: Date;
  rentActive?: boolean;
  rentFuelStart?: string;
  rentFuelFinish?: string;
  rentKmStart?: string;
  rentKmFinish?: string;
  rentCar?: Car;
  rentClient?: ClientType;
}
