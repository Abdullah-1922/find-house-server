import mongoose from "mongoose";


const popularPlaceSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    trim: true,
  },
  propertyCount: {
    type: Number,
    required: true,
    min: 0,
  },
  images: {
    type: [String],
    validate: {
      validator: (val:string[]) => val.length > 0,
      message: 'At least one image is required.',
    },
  },
}, { timestamps: true });

export const PopularPlace = mongoose.model('PopularPlace', popularPlaceSchema);

