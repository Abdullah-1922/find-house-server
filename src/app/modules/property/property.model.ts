import mongoose, { Schema } from "mongoose";

import { TProperty } from "./property.interface";

const PropertyStatus = ["active", "non-active"] as const;
const category = ["rent", "sell"] as const;
const PropertyType = [
  "house",
  "commercial",
  "apartment",
  "lot",
  "garage",
] as const;
const Features = [
  "Air Conditioning",
  "Swimming Pool",
  "Central Heating",
  "Laundry Room",
  "Gym",
  "Alarm",
  "Window Covering",
  "Refrigerator",
  "TV Cable & WIFI",
  "Microwave",
] as const;
const ExtraInfoAge = [
  "0-1",
  "0-5",
  "0-10",
  "0-15",
  "0-20",
  "0-50",
  "50+",
] as const;

const locationSchema = new Schema(
  {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
  },
  { _id: false, versionKey: false },
);

const extraInfoSchema = new Schema({
  age: { type: String, enum: ExtraInfoAge, required: true },
  rooms: { type: Number, min: 0, max: 6, default: 0 },
  bathrooms: { type: Number, min: 0, max: 6, default: 0 },
});

const contactInfoSchema = new Schema({
  name: { type: String, required: true },
  userName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

const propertySchema = new Schema<TProperty>(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ownedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    status: {
      type: String,
      enum: PropertyStatus,
      required: true,
      default: "active",
    },
    feedback: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }],
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: category, required: true },
    floorPlanImage: { type: String },
    type: { type: String, enum: PropertyType, required: true },
    rooms: { type: Number, min: 1, max: 5, default: 1 },
    price: { type: Number, required: true },
    area: { type: Number, required: true },
    images: [{ type: String }],
    favoriteBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    location: { type: locationSchema, required: true },
    extraInfo: { type: extraInfoSchema, required: true },
    features: { type: [String], enum: Features, required: true },
    contactInfo: { type: contactInfoSchema, required: true },
  },
  { timestamps: true },
);

const Property = mongoose.model<TProperty>("Property", propertySchema);

export default Property;
