import { z } from "zod";

const CreateScheduleValidationSchema = z.object({
  body: z.object({
    user: z.string().nonempty("User ID is required"), // User ObjectId
    agent: z.string().nonempty("Agent ID is required"), // Agent ObjectId
    property: z.string().nonempty("Property ID is required"), // Property ObjectId
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: "Time must be in 24-hour format (HH:mm)",
    }),
  }),
});

const UpdateIsApprovedValidationSchema = z.object({
  body: z.object({
    isApproved: z.boolean(),
  }).strict(),
});

const UpdateIsAcceptedValidationSchema = z.object({
  body: z.object({
    isAccepted: z.boolean(),
  }),
});

export const ScheduleValidation = {
  CreateScheduleValidationSchema,
  UpdateIsApprovedValidationSchema,
  UpdateIsAcceptedValidationSchema,
};
