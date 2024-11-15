import { z } from "zod";

const locationValidationSchema = z.object({
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  latitude: z.string().min(1, "Latitude is required"),
  longitude: z.string().min(1, "Longitude is required"),
});

const extraInfoValidationSchema = z.object({
  age: z.enum(["0-1", "0-5", "0-10", "0-15", "0-20", "0-50", "50+"]),
  rooms: z.number().min(0).max(6).default(0),
  bathrooms: z.number().min(0).max(6).default(0),
});

const contactInfoValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  userName: z.string().min(1, "Username is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email format"),
});

export const createPropertyValidationSchema = z.object({
  body: z.object({
    author: z.string().nonempty("Author ID is required"),
    ownedBy: z.string().optional(),
    status: z.enum(["active", "non-active"]),

    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    category: z.enum(["rent", "sell"]),
    type: z.enum(["house", "commercial", "apartment", "lot", "garage"]),
    rooms: z.number().min(1).max(5).default(1),
    price: z.number().positive("Price must be a positive number"),
    area: z.number().positive("Area must be a positive number"),
    images: z.array(z.string()).optional(),
    location: locationValidationSchema,
    extraInfo: extraInfoValidationSchema,
    features: z
      .array(
        z.enum([
          "Air Conditioning",
          "Swimming Pool",
          "Central Heating",
          "Laundry Room",
          "Gym",
          "Alarm",
          "Window Covering",
          "Refrigerator",
          "TV Cable & WIFI",
          "Microwave",
        ]),
      )
      .nonempty("At least one feature is required"),
    contactInfo: contactInfoValidationSchema,
  }),
});

export const updatePropertyValidationSchema = z.object({
  body: z.object({
   
    ownedBy: z.string().nonempty("Owner ID is required").optional(),
    status: z.enum(["active", "non-active"]).optional(),
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().min(1, "Description is required").optional(),
    category: z.enum(["rent", "sell"]).optional(),
    type: z
      .enum(["house", "commercial", "apartment", "lot", "garage"])
      .optional(),
    rooms: z.number().min(1).max(5).default(1).optional(),
    price: z.number().positive("Price must be a positive number").optional(),
    area: z.number().positive("Area must be a positive number").optional(),
    images: z.array(z.string()).optional(),
    location: locationValidationSchema.partial().optional(),
    extraInfo: extraInfoValidationSchema.partial().optional(),
    features: z
      .array(
        z.enum([
          "Air Conditioning",
          "Swimming Pool",
          "Central Heating",
          "Laundry Room",
          "Gym",
          "Alarm",
          "Window Covering",
          "Refrigerator",
          "TV Cable & WIFI",
          "Microwave",
        ]),
      )
      .nonempty("At least one feature is required")
      .optional(),
    contactInfo: contactInfoValidationSchema.partial().optional(),
  }),
});

export const PropertyValidations = {
  createPropertyValidationSchema,
  updatePropertyValidationSchema,
};
