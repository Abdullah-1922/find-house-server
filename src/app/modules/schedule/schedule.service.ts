/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import Property from "../property/property.model";
import { User } from "../User/user.model";
import { ISchedule } from "./schedule.interface";
import { Schedule } from "./schedule.model";

const createSchedule = async (payload: Partial<ISchedule>) => {
  if (payload.agent == payload.user) {
    throw new AppError(400, "You can't schedule a property with yourself");
  }
  const property = await Property.findById(payload.property);
  if (!property) {
    throw new AppError(400, "Property not found");
  }
  const currentDateTime = new Date();

  if (currentDateTime > payload.date!) {
    throw new AppError(400, "You can't schedule a property in the past");
  }
  const user = await User.findById(payload.user);
  if (!user) {
    throw new AppError(400, "User not found");
  }
  const agent = await User.findById(payload.agent);
  if (!agent) {
    throw new AppError(400, "Agent not found");
  }
  const res = await Schedule.create(payload);
  return res;
};

const getAllSchedules = async (query: Record<string, any>) => {
  const scheduleQuery = new QueryBuilder(
    Schedule.find().populate(["user", "agent", "property"]),
    query,
  )
    .search(["isApproved", "isAccepted"])
    .sort()
    .fields()
    .filter()
    .paginate();

  const result = await scheduleQuery.modelQuery;
  const meta = await scheduleQuery.countTotal();
  return { result, meta };
};

const getSingleSchedule = async (id: string) => {
  const schedule = await Schedule.findById(id).populate([
    "user",
    "agent",
    "property",
  ]);
  if (!schedule) {
    throw new AppError(404, "Schedule not found");
  }
  return schedule;
};

const updateSchedule = async (id: string, payload: Partial<ISchedule>) => {
  const schedule = await Schedule.findById(id);
  if (!schedule) {
    throw new AppError(404, "Invalid Schedule ID");
  }

  const updatedSchedule = await Schedule.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedSchedule;
};

const updateIsAccepted = async (id: string, isAccepted: boolean) => {
  const schedule = await Schedule.findById(id);

  if (!schedule) {
    throw new AppError(404, "Schedule not found");
  }
  if (!schedule.isApproved) {
    throw new AppError(
      400,
      "Schedule must be approved by admin before it can be accepted",
    );
  }

  schedule.isAccepted = isAccepted;
  await schedule.save();
  return schedule;
};

const updateIsApproved = async (id: string, isApproved: boolean) => {
  if (typeof isApproved !== "boolean") {
    throw new AppError(400, "Invalid value for isApproved, must be boolean.");
  }

  const schedule = await Schedule.findByIdAndUpdate(
    id,
    { isApproved: isApproved },
    { new: true },
  );
  if (!schedule) {
    throw new AppError(404, "Schedule not found");
  }

  return schedule;
};

const deleteSchedule = async (id: string) => {
  const schedule = await Schedule.findByIdAndDelete(id);
  if (!schedule) {
    throw new AppError(404, "Invalid Schedule ID");
  }
  return schedule;
};

const getAgentSchedules = async (agentId: string, query: any) => {
  const scheduleQuery = new QueryBuilder(
    Schedule.find({ agent: agentId }).populate(["user", "agent", "property"]),
    query,
  )
    .search(["isApproved", "isAccepted"])
    .sort()
    .fields()
    .filter()
    .paginate();

  const result = await scheduleQuery.modelQuery;
  const meta = await scheduleQuery.countTotal();
  return { result, meta };
};
const getUserSchedules = async (userId: string, query: any) => {
  const scheduleQuery = new QueryBuilder(
    Schedule.find({ user: userId }).populate(["user", "agent", "property"]),
    query,
  )
    .search(["isApproved", "isAccepted"])
    .sort()
    .fields()
    .filter()
    .paginate();

  const result = await scheduleQuery.modelQuery;
  const meta = await scheduleQuery.countTotal();
  return { result, meta };
};

export const ScheduleServices = {
  createSchedule,
  getAllSchedules,
  getSingleSchedule,
  updateSchedule,
  deleteSchedule,
  updateIsAccepted,
  updateIsApproved,
  getAgentSchedules,
  getUserSchedules,
};
