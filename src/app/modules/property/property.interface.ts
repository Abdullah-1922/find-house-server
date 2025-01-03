/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from "mongoose";

export type PropertyStatus = "active" | "non-active";

export type PropertyCategory = "rent" | "sell";

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
  | "TV Cable & Wifi"
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
  phone?: string;
  email?: string;
}

export type TProperty = {
  author: Types.ObjectId;
  ownedBy: Types.ObjectId;
  status: PropertyStatus;
  feedback: Types.ObjectId[];
  comment: Types.ObjectId[];
  title: string;
  description: string;
  category: PropertyCategory;
  type: PropertyType;
  rooms: number;
  price: number;
  favoriteBy: Types.ObjectId[];
  area: number;
  floorPlanImage: string[];
  videoUrl: string[];
  images: string[];
  location: ILocation;
  extraInfo: IExtraInfo;
  features: Features[];
  contactInfo: IContactInfo;
  [key: string]: any;
};

export interface TRangeFilters {
  price?: { $gte: number; $lte: number };
  area?: { $gte: number; $lte: number };
}
