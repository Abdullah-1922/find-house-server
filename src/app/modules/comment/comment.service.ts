/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
// import { Property } from "../tourProperty/property.model";
import { TComment } from "./comment.interface";
import { Comment } from "./comment.model";
import { User } from "../User/user.model";
import mongoose from "mongoose";
import Property from "../property/property.model";
import QueryBuilder from "../../builder/QueryBuilder";

const createComment = async (payload: Partial<TComment>) => {
  const { propertyId, userId } = payload;

  const propertyData = await Property.findById(propertyId);
  const userData = await User.findById(userId);

  if (!propertyData) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid property Id");
  }
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid userId");
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const [newComment] = await Comment.create([{ ...payload }], { session });

    await Property.findByIdAndUpdate(
      propertyId,
      { $push: { comment: newComment._id } },
      { new: true, session },
    );

    await session.commitTransaction();
    session.endSession();

    return newComment;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to create comment",
    );
  }
};

const getCommentForProperty = async (
  propertyId: string,
  query: Record<string, unknown>,
) => {
  const property = await Property.findById(propertyId);
  if (!property) {
    throw new AppError(404, "Invalid property Id");
  }
  const propertyComment = new QueryBuilder(
    Comment.find({ propertyId }).populate(["userId"]),
    query,
  )
    .search(["comment"])
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await propertyComment.modelQuery;
  const meta = await propertyComment.countTotal();
  return { meta,result };
};

export const CommentServices = {
  createComment,
  getCommentForProperty,
};
