/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import Property from "../property/property.model";
import { User } from "../User/user.model";
import { TPropertyPayment } from "./propertyPayment.interface";
import PropertyPayment from "./propertyPayment.model";

const createPayment = async (paymentData: TPropertyPayment) => {
  const { category, totalPrice, monthlyRent, leaseDuration, user, property } =
    paymentData;
  const propertyInfo = await Property.findById(property);
  if (!propertyInfo) {
    throw new AppError(404, "Property not found");
  }
  const userData = await User.findById(user);
  if (!userData) {
    throw new AppError(404, "User not found");
  }

  // Validation for conditional fields
  if (category === "sell" && !totalPrice) {
    throw new AppError(404, "Total price is required for sell category");
  }
  if (category === "rent" && (!monthlyRent || !leaseDuration)) {
    throw new AppError(
      404,
      "Monthly rent and lease duration are required for rent category",
    );
  }
  if (propertyInfo.category !== category) {
    throw new AppError(404, "Category does not match with property category");
  }

  const payment = await PropertyPayment.create(paymentData);
  if (payment) {
    await Property.findByIdAndUpdate(payment.property, {
      status: "non-active",
    });
  }
  return payment;
};

const getPayments = async (query: any) => {
  const paymentQuery = new QueryBuilder(
    PropertyPayment.find().populate("property user"),
    query,
  )
    .search(["category", "extraInfo"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const payments = await paymentQuery.modelQuery;
  const meta = await paymentQuery.countTotal();
  return { payments, meta };
};
const getPaymentsForAgent = async (userId: string, query: any) => {
  const paymentQuery = new QueryBuilder(
    PropertyPayment.find({ user: userId }).populate("property user"),
    query,
  )
    .search(["category", "extraInfo"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const payments = await paymentQuery.modelQuery;
  const meta = await paymentQuery.countTotal();
  return { payments, meta };
};

const getPaymentById = async (id: string) => {
  const payment = await PropertyPayment.findById(id).populate("property user");
  if (!payment) {
    throw new AppError(404, "Payment not found");
  }
  return payment;
};
const updatePaymentPayment = async (
  id: string,
  paymentData: TPropertyPayment,
) => {
  const propertyPayment = await PropertyPayment.findById(id);
  if (!propertyPayment) {
    throw new AppError(404, "Payment not found");
  }
  if (paymentData.property) {
    const propertyData = await Property.findById(paymentData.property);
    if (!propertyData) {
      throw new AppError(404, "Property not found");
    }
  }
  if (paymentData.user) {
    const userData = await User.findById(paymentData.user);
    if (!userData) {
      throw new AppError(404, "User not found");
    }
  }
  if (paymentData.category) {
    throw new AppError(404, "Category cannot be updated");
  }

  const payment = await PropertyPayment.findByIdAndUpdate(id, paymentData, {
    new: true,
  });

  return payment;
};

export const PropertyPaymentService = {
  createPayment,
  getPayments,
  getPaymentById,
  updatePaymentPayment,
  getPaymentsForAgent,
};
