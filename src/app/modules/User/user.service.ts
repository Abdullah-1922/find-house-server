import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import Auth from "../Auth/auth.model";

import { UserSearchableFields } from "./user.constant";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const findUserById = async (userId: string) => {
  const result = await User.findOne({ auth: userId }).populate("auth");

  console.log(result);
  return result;
};

const getAllUsers = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find().populate("auth"), query)
    .search(UserSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;
  const metaData = await userQuery.countTotal();
  return {
    meta: metaData,
    data: result,
  };
};

const updateUserById = async (userId: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate({ _id: userId }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteUserById = async (userId: string) => {
  const result = await User.findByIdAndDelete(userId);
  return result;
};

const updateRole = async (userId: string, role: "admin" | "agent" | "user") => {
  const result = await User.findByIdAndUpdate(
    { _id: userId },
    { role },
    {
      new: true,
      runValidators: true,
    },
  );
  if (!result) {
    throw new AppError(404, "User not found");
  }

  if (result?.auth) {
    await Auth.findByIdAndUpdate(result?.auth, { role });
  }

  return result;
};

export const UserService = {
  findUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
  updateRole,
};
