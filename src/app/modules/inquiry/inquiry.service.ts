/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import { IInquiry } from "./inquiry.interface";
import { Inquiry } from "./inquiry.model";

const createInquiry = async (payload: IInquiry) => {
  if (!payload.agent || !payload.user) {
    throw new AppError(400, "Agent and user are required");
  }
  const user = await User.findById(payload.user);

  if (!user) {
    throw new AppError(400, "User not found");
  }
  const agent = await User.findById(payload.agent);
  if (!agent) {
    throw new AppError(400, "Agent not found");
  }
  const newInquiry = await Inquiry.create(payload);
  return newInquiry;
};

const getAllInquiries = async (query: any) => {
  const inquiryQuery = new QueryBuilder(
    Inquiry.find().populate("agent user"),
    query,
  );

  const result = await inquiryQuery.modelQuery;
  const meta = await inquiryQuery.countTotal();
  return { result, meta };
};

const getSingleInquiry = async (id: string) => {
  const inquiry = await Inquiry.findById(id).populate("agent user");
  if (!inquiry) {
    throw new AppError(404, "Inquiry not found");
  }
  return inquiry;
};

const deleteInquiry = async (id: string) => {
  const inquiry = await Inquiry.findByIdAndDelete(id);
  if (!inquiry) {
    throw new AppError(404, "Inquiry not found");
  }
  return inquiry;
};

const getInquiriesByUser = async (userId: string, query: any) => {
  const inquiryQuery = new QueryBuilder(
    Inquiry.find({ user: userId }).populate("agent user"),
    query,
  );

  const result = await inquiryQuery.modelQuery;
  const meta = await inquiryQuery.countTotal();
  return { result, meta };
};
const getInquiriesByAgent = async (agentId: string, query: any) => {
  console.log(agentId);
  const inquiryQuery = new QueryBuilder(
    Inquiry.find({ agent: agentId }).populate("agent user"),
    query,
  );

  const result = await inquiryQuery.modelQuery;
  const meta = await inquiryQuery.countTotal();
  return { result, meta };
};
const updateInquiry = async (id: string, payload: IInquiry) => {
  const inquiry = await Inquiry.findByIdAndUpdate(id, payload, { new: true });
  if (!inquiry) {
    throw new AppError(404, "Inquiry not found");
  }
  return inquiry;
}

export const InquiryServices = {
  createInquiry,
  getAllInquiries,
  getSingleInquiry,
  deleteInquiry,
  getInquiriesByUser,
  getInquiriesByAgent,
  updateInquiry,
};
