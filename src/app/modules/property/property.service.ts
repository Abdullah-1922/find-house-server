/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../errors/AppError";

import { TProperty } from "./property.interface";
import mongoose from "mongoose";
import Property from "./property.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { User } from "../User/user.model";

const createProperty = async (payload: Partial<TProperty>) => {
  if (!payload.title || !payload.author || !payload.price) {
    throw new AppError(400, "Missing required fields: title, author, or price");
  }

  const authorExists = await mongoose.model("User").findById(payload.author);

  if (!authorExists) {
    throw new AppError(404, "Author  not found");
  }
  payload.ownedBy = authorExists._id;

  const res = await Property.create(payload);
  if (res) {
    await User.findByIdAndUpdate(res.ownedBy, {
      $push: { property: res._id },
    });
  }
  return res;
};

// Get all properties with query filters
const getAllProperties = async (query: Record<string, unknown>) => {
  const propertyQuery = new QueryBuilder(
    Property.find().populate(["author", "ownedBy"]),
    query,
  )
    .search(["title", "description", "category", "type"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await propertyQuery.modelQuery;
  const meta = await propertyQuery.countTotal();
  return { result, meta };
};

// Get a single property by ID
const getSingleProperty = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(400, "Invalid property ID format");
  }

  const property = await Property.findById(id).populate(["author", "ownedBy"]);
  if (!property) {
    throw new AppError(404, "Property not found");
  }
  return property;
};

// Update a property by ID
const updateProperty = async (id: string, payload: Partial<TProperty>) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(400, "Invalid property ID format");
  }

  if (payload.author) {
    throw new AppError(400, "Author cannot be updated");
  }

  const property = await Property.findById(id);
  if (!property) {
    throw new AppError(404, "Property not found");
  }

  const updateData: Record<string, any> = {};
  Object.keys(payload).forEach((key) => {
    if (typeof payload[key] === "object" && !Array.isArray(payload[key])) {
      // Flatten nested objects using dot notation
      Object.entries(payload[key] as Record<string, any>).forEach(
        ([nestedKey, value]) => {
          updateData[`${key}.${nestedKey}`] = value;
        },
      );
    } else {
      // Directly add non-nested fields
      updateData[key] = payload[key];
    }
  });

  const result = await Property.findByIdAndUpdate(id, { $set: updateData }, { new: true });
  return result;
};

// Delete a property by ID
const deleteProperty = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(400, "Invalid property ID format");
  }

  const property = await Property.findById(id);
  if (!property) {
    throw new AppError(404, "Property not found");
  }

  const result = await Property.findByIdAndDelete(id);
  return result;
};

export const PropertyServices = {
  createProperty,
  getAllProperties,
  getSingleProperty,
  updateProperty,
  deleteProperty,
};
