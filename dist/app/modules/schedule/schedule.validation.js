"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleValidation = void 0;
const zod_1 = require("zod");
const CreateScheduleValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string().nonempty("User ID is required"),
        agent: zod_1.z.string().nonempty("Agent ID is required"),
        property: zod_1.z.string().nonempty("Property ID is required"),
        date: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date format",
        }),
        time: zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
            message: "Time must be in 24-hour format (HH:mm)",
        }),
    }),
});
const UpdateIsApprovedValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        isApproved: zod_1.z.boolean(),
    }).strict(),
});
const UpdateIsAcceptedValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        isAccepted: zod_1.z.boolean(),
    }),
});
exports.ScheduleValidation = {
    CreateScheduleValidationSchema,
    UpdateIsApprovedValidationSchema,
    UpdateIsAcceptedValidationSchema,
};
