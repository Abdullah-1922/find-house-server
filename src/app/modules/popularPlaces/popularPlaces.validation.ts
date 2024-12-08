import { z } from "zod";

const createPopularPlaceSchema = z.object({
  body: z.object({
    location: z.string().nonempty("Location is required"),
    propertyCount: z
      .number()
      .min(0, "Property count must be a positive number"),
    images: z
      .array(z.string().url())
      .min(1, "At least one image URL is required"),
  }),
});

const UpdatedPopularPlaceSchema = z.object({
  body: z.object({
    location: z.string().nonempty("Location is required").optional(),
    propertyCount: z
      .number()
      .min(0, "Property count must be a positive number").optional(),
    images: z
      .array(z.string().url())
      .min(1, "At least one image URL is required").optional(),
  }),
});

export const PopularPlaceValidation = {
  createPopularPlaceSchema,
  UpdatedPopularPlaceSchema,
};
