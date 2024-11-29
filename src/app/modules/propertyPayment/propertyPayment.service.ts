/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from "../../builder/QueryBuilder";
import Property from "../property/property.model";
import { User } from "../User/user.model";
import { TPropertyPayment } from "./propertyPayment.interface";
import PropertyPayment from "./propertyPayment.model";

const createPayment = async (paymentData: TPropertyPayment) => {
  const { category, totalPrice, monthlyRent, leaseDuration, user, property } =
    paymentData;
  const propertyInfo = await Property.findById(property);
  if (!propertyInfo) {
    throw new Error("Property not found");
  }
  const userData = await User.findById(user);
  if (!userData) {
    throw new Error("User not found");
  }

  // Validation for conditional fields
  if (category === "sell" && !totalPrice) {
    throw new Error("Total price is required for sell category");
  }
  if (category === "rent" && (!monthlyRent || !leaseDuration)) {
    throw new Error(
      "Monthly rent and lease duration are required for rent category",
    );
  }
  if (propertyInfo.category !== category) {
    throw new Error("Category does not match with property category");
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
  );

  const payments = await paymentQuery.modelQuery;
  const meta = await paymentQuery.countTotal();
  return { payments, meta };
};

const getPaymentById = async (id: string) => {
  const payment = await PropertyPayment.findById(id).populate("property user");
  if (!payment) {
    throw new Error("Payment not found");
  }
  return payment;
};
const updatePaymentPayment = async (
  id: string,
  paymentData: TPropertyPayment,
) => {
  const propertyPayment = await PropertyPayment.findById(id);
  if (!propertyPayment) {
    throw new Error("Payment not found");
  }
  if (paymentData.property) {
    const propertyData = await Property.findById(paymentData.property);
    if (!propertyData) {
      throw new Error("Property not found");
    }
  }
  if (paymentData.user) {
    const userData = await User.findById(paymentData.user);
    if (!userData) {
      throw new Error("User not found");
    }
  }
  if (paymentData.category) {
    throw new Error("Category cannot be updated");
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
};