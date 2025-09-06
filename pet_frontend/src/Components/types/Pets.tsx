import type { IRescueCenter } from './RescueCenter';

export interface IPet {
  pet_id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: string;
  size: string;
  weight: number;
  energy_level: string;
  vaccination_status: string;
  spayed_neutered: string;
  good_with_children: string;
  good_with_other_pets: string;
  description: string;
  rescue_date: string;
  rescue_location: string;
  rescue_condition: string;
  image_url: string;
  rescued_by:string
  adoption_status:string
  rescue_center_id?: string;
  rescueCenter?: IRescueCenter;
}
