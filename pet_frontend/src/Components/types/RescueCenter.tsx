import type { IPet } from "./Pets";

export interface IRescueCenter {
  center_id: string;
  name: string;
  email: string;
  phone_no: string;
  address: string;
  city: string;
  district: string;
  province: string;
  latitude: number;
  longitude: number;
  image_url?: string;
  history?: string;
  registeredAt?: string;
  pets: IPet[];
}
