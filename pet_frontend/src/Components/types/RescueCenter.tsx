import type { IPet } from "./Pets";

export interface IRescueCenter {
  center_id: number;
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
  registeredAt?: string;
  pet: IPet[];
}
