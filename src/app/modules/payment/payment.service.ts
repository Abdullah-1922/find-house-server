/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "../User/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { v4 as uuidv4 } from "uuid";
import QueryBuilder from "../../builder/QueryBuilder";
import { initialPayment, verifyPayment } from "./payment.utils";
import { Payment } from "./payment.model";
import { IPayment } from "./payment.interface";
import { format } from "date-fns";
import { Product } from "../product/product.model";

const createPayment = async (payload: Omit<IPayment, "transactionId">) => {
  const user = await User.findById(payload.customerId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User is not found");
  }

  // Generate a transition ID
  const generateTransactionId = (): string => {
    const randomText = uuidv4().replace(/-/g, "");
    const trimmedText = randomText.substring(0, 8);
    return `FHTX-${trimmedText}`;
  };

  const transactionId = generateTransactionId();
  const paymentData = { ...payload, transactionId };

  // Make the initial payment request
  const paymentResponse = await initialPayment(paymentData);

  if (!paymentResponse) {
    throw new AppError(httpStatus.BAD_REQUEST, "Payment initiation failed");
  }

  // Save payment data to the database
  const result = await Payment.create({
    ...paymentData,
    customerId: payload.customerId,
  });

  return {
    paymentResponse,
    result,
  };
};

const cashOnDeliveryPayment = async (payload: IPayment) => {
  const user = await User.findById(payload?.customerId);

  // Generate a transition ID
  const generateTransactionId = (): string => {
    const randomText = uuidv4().replace(/-/g, "");
    const trimmedText = randomText.substring(0, 8);
    return `FHTX-${trimmedText}`;
  };

  const transactionId = generateTransactionId();

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const result = await Payment.create({ ...payload, transactionId });
  console.log("payment result", result);
  return result;
};

const paymentConformationIntoDB = async (
  transactionId: string,
  status: string,
) => {
  let paymentStatus = "failed";
  let message = "Payment Failed. Please try again.";
  const paymentData = await Payment.findOne({ transactionId });

  // remove this id on the user model

  if (status === "failed") {
    await Payment.findOneAndUpdate({ transactionId }, { status: "Failed" });
  }
  if (status === "success") {
    const productIds = paymentData?.products;
    console.log("productIds", productIds);

    if (productIds && productIds.length > 0) {
      // Step 1: Remove matching productIds from the user's favoriteProducts
      const updatedUser = await User.findByIdAndUpdate(
        paymentData.customerId,
        {
          $pull: {
            favoriteProducts: { $in: productIds }, // Remove matching productIds
          },
        },
        { new: true }, // Return the updated document
      );

      console.log("Updated User:", updatedUser);

      // Step 2: Update each product's favoriteBy array
      const updateProductPromises = productIds.map(async (productId) => {
        return Product.findByIdAndUpdate(
          productId,
          {
            $pull: {
              favoriteBy: paymentData.customerId,
            },
          },
          { new: true }, // Return the updated document
        );
      });

      // Execute all update operations
      const updatedProducts = await Promise.all(updateProductPromises);
      console.log("Updated Products:", updatedProducts);
    } else {
      console.log("No products to remove from favoriteProducts.");
    }

    const verifyResponse = await verifyPayment(transactionId);

    if (verifyResponse && verifyResponse.pay_status === "Successful") {
      const updatedPayment = await Payment.findOneAndUpdate(
        { transactionId },
        { status: "Paid" },
        { new: true },
      );

      if (!updatedPayment) {
        throw new AppError(httpStatus.NOT_FOUND, "Payment record not found");
      }

      paymentStatus = "success";
      message =
        "Thank you for upgrading to premium access. Your transaction has been completed successfully!";
    }
  }

  const icon = paymentStatus === "success" ? "&#10004;" : "&#10008;";
  const iconClass = paymentStatus === "success" ? "success" : "failure";
  const header =
    paymentStatus === "success" ? "Payment Successful" : "Payment Failed";
  const buttonClass = paymentStatus === "success" ? "button" : "button failure";
  const buttonText =
    paymentStatus === "success" ? "Return to Dashboard" : "Try Payment Again";

  const details =
    paymentStatus === "success"
      ? `
        <div>
            <span>Amount Paid:</span>
            <span>${paymentData?.amount}</span>
        </div>
        <div>
            <span>Transaction ID:</span>
            <span>${transactionId}</span>
        </div>
        <div>
            <span>Date:</span>
            <span>${format(
        new Date(paymentData?.createdAt as Date),
        "dd MMM, yyyy",
      )}</span>
        </div>
      `
      : `
        <div>
            <span>Error Code:</span>
            <span>ERR12345</span>
        </div>
        <div>
            <span>Date:</span>
            <span>${format(new Date(), "dd MMM, yyyy")}</span>
        </div>
        <div>
            <span>Attempted Amount:</span>
            <span>৳ ${paymentData?.amount || "৳ 0.00"}</span>
        </div>
      `;

  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${header}</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 2rem;
            width: 100%;
            max-width: 400px;
            text-align: center;
        }
        .icon {
            font-size: 4rem;
            margin-bottom: 1rem;
        }
        .success {
            color: #4CAF50;
        }
        .failure {
            color: #F44336;
        }
        h1 {
            color: #333;
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }
        p {
            color: #666;
            font-size: 1rem;
            line-height: 1.5;
            margin-bottom: 1.5rem;
        }
        .details {
            background-color: #f9f9f9;
            border-radius: 4px;
            padding: 1rem;
            margin-bottom: 1.5rem;
            text-align: left;
        }
        .details div {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
        }
        .details span:first-child {
            font-weight: bold;
            color: #333;
        }
        .button {
            background-color: #4CAF50;
            border: none;
            border-radius: 4px;
            color: white;
            cursor: pointer;
            font-size: 1rem;
            padding: 0.75rem 1.5rem;
            text-decoration: none;
            transition: background-color 0.3s ease;
        }
        .button:hover {
            background-color: #45a049;
        }
        .button.failure {
            background-color: #F44336;
        }
        .button.failure:hover {
            background-color: #d32f2f;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon ${iconClass}">${icon}</div>
        <h1>${header}</h1>
        <p>${message}</p>
        <div class="details">
            ${details}
        </div>
        <a href="https://wwwfind-house.vercel.app/payment" class="${buttonClass}">${buttonText}</a>
    </div>
</body>
</html>`;
};

const CasOnDeliveryStatusUpdate = async (payload: IPayment, userId: string) => {
  const user = await User.findById(userId);
  let result;
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const paymentData = await Payment.findOne({
    transactionId: payload.transactionId,
  });
  const productIds = paymentData?.products;
  console.log("productIds", productIds);

  if (payload.status === "Paid") {
    if (productIds && productIds.length > 0) {
      const updatedUser = await User.findByIdAndUpdate(
        paymentData.customerId,
        {
          $pull: {
            favoriteProducts: { $in: productIds }, // Remove matching productIds
          },
        },
        { new: true }, // Return the updated document
      );

      console.log("Updated User:", updatedUser);

      // Step 2: Update each product's favoriteBy array
      const updateProductPromises = productIds.map(async (productId) => {
        return Product.findByIdAndUpdate(
          productId,
          {
            $pull: {
              favoriteBy: paymentData.customerId,
            },
          },
          { new: true }, // Return the updated document
        );
      });

      // Execute all update operations
      const updatedProducts = await Promise.all(updateProductPromises);
      console.log("Updated Products:", updatedProducts);
    } else {
      console.log("No products to remove from favoriteProducts.");
    }

    result = await Payment.findOneAndUpdate(
      { transactionId: payload.transactionId },
      { status: "Paid" },
      { new: true },
    );
  }

  if (payload.status === "Canceled") {
    result = await Payment.findOneAndUpdate(
      { transactionId: payload.transactionId },
      { status: "Canceled" },
      { new: true },
    );
  }
  return result;
};

const getMyPaymentsData = async (
  query: Record<string, any>,
  customerId: string,
) => {
  const paymentQueryBuilder = new QueryBuilder(
    Payment.find({ customerId }).populate("customerId").populate("products"),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await paymentQueryBuilder.modelQuery;
  const meta = await paymentQueryBuilder.countTotal();

  return {
    meta,
    result,
  };
};


const getAllPaymentsDatForAnalytics = async () => {
  const result = await Payment.find().populate("user");

  return result;
};

const getAllPayments = async (
  query: Record<string, any>,
) => {
  const paymentQueryBuilder = new QueryBuilder(
    Payment.find().populate("customerId").populate("products"),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await paymentQueryBuilder.modelQuery;
  const meta = await paymentQueryBuilder.countTotal();

  return {
    meta,
    result,
  };
};

const updatePaymentStatus = async (paymentId: string, status: string) => {
  const result = await Payment.findByIdAndUpdate(
    paymentId,
    { status: status },
    { new: true },
  );
  return result;
};


export const PaymentService = {
  createPayment,
  cashOnDeliveryPayment,
  paymentConformationIntoDB,
  CasOnDeliveryStatusUpdate,
  getMyPaymentsData,
  getAllPaymentsDatForAnalytics,
  getAllPayments,
  updatePaymentStatus
};
