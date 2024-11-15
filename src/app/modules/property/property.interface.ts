/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from "mongoose";

export type PropertyStatus = "active" | "non-active";

export type PropertyCategory = "residential" | "commercial";

export type PropertyType =
  | "house"
  | "commercial"
  | "apartment"
  | "lot"
  | "garage";

export type Features =
  | "Air Conditioning"
  | "Swimming Pool"
  | "Central Heating"
  | "Laundry Room"
  | "Gym"
  | "Alarm"
  | "Window Covering"
  | "Refrigerator"
  | "TV Cable & WIFI"
  | "Microwave";

export type ExtraInfoAge =
  | "0-1"
  | "0-5"
  | "0-10"
  | "0-15"
  | "0-20"
  | "0-50"
  | "50+";

export type ContactInfoType = "email" | "phone";

export interface ILocation {
  address: string;
  city: string;
  state: string;
  country: string;
  latitude: string;
  longitude: string;
}

export interface IExtraInfo {
  age: ExtraInfoAge;
  rooms: number;
  bathrooms: number;
}

export interface IContactInfo {
  name: string;
  userName: string;
  phone?: string;
  email?: string;
}

export type TProperty = {
  author: Types.ObjectId;
  ownedBy: Types.ObjectId;
  status: PropertyStatus;
  feedback: Types.ObjectId[];
  title: string;
  description: string;
  category: PropertyCategory;
  type: PropertyType;
  rooms: number;
  price: number;
  area: number;
  images: string[];
  location: ILocation;
  extraInfo: IExtraInfo;
  features: Features[];
  contactInfo: IContactInfo;
  [key: string]: any;
};
