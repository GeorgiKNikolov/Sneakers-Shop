import { User } from "./user";

export interface Sneakers {
  _id: string;
  photo: string;
  brand: string;
  activity: string;
  season: string;
  material: string;
  technology: string;
  size: string;
  prise: string;
  description: string;
  owner: string;
  likes: string[];
  comments: string[];
}
