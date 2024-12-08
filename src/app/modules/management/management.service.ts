import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TManagement } from "./management.interface";
import { Management } from "./management.model";

/* eslint-disable @typescript-eslint/no-explicit-any */

const createManagement = async (payload: Partial<TManagement>) => {
  const management = await Management.findOne();
  if (management) {
    throw new AppError(400, "Management already exists");
  }
  const res = await Management.create(payload);
  return res;
};

const getAllManagement = async (query: Record<string, any>) => {
  const managementQuery = new QueryBuilder(Management.find(), query)
    .search(["aboutPage.title", "contactUsPage.title"])
    .sort()
    .fields()
    .filter()
    .paginate();

  const result = await managementQuery.modelQuery;
  const meta = await managementQuery.countTotal();
  return { result, meta };
};

const getSingleManagement = async (id: string) => {
  const result = await Management.findById(id);
  if (!result) {
    throw new AppError(404, "Management entry not found");
  }
  return result;
};

const updateManagement = async (id: string, payload: Partial<TManagement>) => {
  const management = await Management.findById(id);
  if (!management) {
    throw new AppError(404, "Management id Invalid");
  }

  // Merge the existing management data with the new payload
  const updatedData: Record<string, any> = {};
  Object.keys(payload).forEach((key) => {
    const value = (payload as Record<string, any>)[key];
    if (typeof value === "object" && !Array.isArray(value)) {
      // Flatten nested objects using dot notation
      Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        updatedData[`${key}.${nestedKey}`] = nestedValue;
      });
    } else {
      // Directly add non-nested fields
      updatedData[key] = value;
    }
  });

  const result = await Management.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  return result;
};

const deleteSingleManagement = async (id: string) => {
  const result = await Management.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(404, "Management entry not found");
  }
  return result;
};

export const ManagementServices = {
  createManagement,
  getAllManagement,
  getSingleManagement,
  updateManagement,
  deleteSingleManagement,
};
