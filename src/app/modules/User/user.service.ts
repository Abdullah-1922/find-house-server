import QueryBuilder from "../../builder/QueryBuilder";

import { UserSearchableFields } from "./user.constant";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const findUserById = async (userId: string) => {
  return await User.findById(userId).populate("auth");
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

export const UserService = {
  findUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
};
