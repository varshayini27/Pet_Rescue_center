export interface IRescueCenter {
  id: number;
  name: string;
  email: string;
  phone_no: string;
  address: string;
  city: string;
  district: string;
  province: string;
  latitude: number;
  longitude: number;
  created_at?: string;
  updated_at?: string;
}
