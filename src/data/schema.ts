export const API_URL = "http://localhost:9988";

export interface IMedia {
  name: string;
  url: string;
}

export interface IVehicle {
  id: string;
  modelYear: string;
  url: string;
  image: IMedia | null;
  media: IMedia[];
}

export interface IVehicleData {
  description: string;
  id: string;
  price: string;
}
