import type { IPet } from "./Pets";

export interface IAdoption {
  adoption_id: string;
  pet_id: string;
  full_name: string;
  email: string;
  phone: string;
  reason: string;
  request_date: string; // ISO string, can convert to Date if needed
  status: string;
  pet: IPet;
//   user?: IUser | null; // null in your example
}
