import axios from "axios";
import config from "../../config";
import { IPayment } from "./payment.interface";

export const initialPayment = async (paymentData: IPayment) => {
  const frontendUrl =
    config.NODE_ENV === "development"
      ? config.frontend_local_url
      : config.frontend_live_url;

  const backendUrl =
    config.NODE_ENV === "development"
      ? config.backend_local_url
      : config.backend_live_url;

  try {
    const response = await axios.post(config.aamarpay_url!, {
      store_id: "aamarpaytest",
      signature_key: config.signature_key,
      tran_id: paymentData.transactionId,
      success_url: `${backendUrl}/api/v1/payment/confirmation/${paymentData.customerId}?transactionId=${paymentData.transactionId}&status=success`,
      fail_url: `${backendUrl}/api/v1/payment/confirmation/${paymentData.customerId}?transactionId=${paymentData.transactionId}&status=failed`,
      cancel_url: `${frontendUrl}`,
      amount: paymentData.amount,
      currency: paymentData.currency,
      desc: "Payment for premium access on TT&DG",
      cus_name: paymentData.name,
      cus_email: paymentData.email,
      cus_add1: paymentData.address,
      cus_add2: "N/A",
      cus_city: paymentData.city || "N/A",
      cus_state: paymentData.state || "N/A",
      cus_postcode: paymentData.zip || "N/A",
      cus_country: paymentData.country,
      cus_phone: paymentData.phone || "N/A",
      type: "json",
    });

    return response.data;
  } catch (error) {
    console.error("Error initiating payment:", error);
    throw new Error("Failed to initiate payment");
  }
};

/**
 * Verifies a payment status using the Aamarpay gateway.
 * @param transactionId - The unique transaction ID for the payment.
 * @returns Verification response data from the payment gateway.
 */
export const verifyPayment = async (transactionId: string) => {
  try {
    const response = await axios.get(config.payment_verify_url!, {
      params: {
        request_id: transactionId,
        store_id: config.store_id,
        signature_key: config.signature_key,
        type: "json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw new Error("Failed to verify payment");
  }
};
