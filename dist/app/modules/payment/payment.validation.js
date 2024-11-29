"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSchema = void 0;
const zod_1 = require("zod");
exports.PaymentSchema = zod_1.z.object({
    body: zod_1.z.object({
        customerId: zod_1.z.string().min(1, "Customer id is required"),
        products: zod_1.z.array(zod_1.z.string()).nonempty("Products array must not be empty"),
        name: zod_1.z.string().min(1, "Name is required"),
        email: zod_1.z.string().email("Invalid email address"),
        phone: zod_1.z.string().min(10, "Phone number must be at least 10 characters"),
        city: zod_1.z.string().min(1, "City is required"),
        state: zod_1.z.string().min(1, "State is required"),
        country: zod_1.z.string().min(1, "Country is required"),
        address: zod_1.z.string().min(1, "Address is required"),
        zip: zod_1.z.string().min(1, "ZIP code is required"),
        gatewayName: zod_1.z.enum(["Cash On Delivery", "Online Payment"], {
            required_error: "PAyment gateway is required",
        }),
        currency: zod_1.z.enum(["BDT", "USD"], {
            required_error: "Currency is required",
        }),
        amount: zod_1.z.number().positive("Amount must be a positive number"),
    }),
});
