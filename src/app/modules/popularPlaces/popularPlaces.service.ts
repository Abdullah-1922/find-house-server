/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TPopularPlace } from "./popularPlaces.interface";
import { PopularPlace } from "./popularPlaces.model";

const createPopularPlace = async (data: TPopularPlace) => {
  return await PopularPlace.create(data);
};

const getAllPopularPlaces = async (query:any) => {
  const QueryPlaces = new QueryBuilder(PopularPlace.find(), query)
    .search(["location"])
    .filter()
    .sort()
    .paginate()
    .fields();
    const result = await QueryPlaces.modelQuery;
    const total = await QueryPlaces.countTotal();

  return { result, total };
};

const getPopularPlaceById = async (id: string) => {
  return await PopularPlace.findById(id);
};

const updatePopularPlace = async (id: string, data: Partial<TPopularPlace>) => {
  const place = await PopularPlace.findById(id);
  if (!place) {
    throw new AppError(404, "Popular place not found");
  }
  return await PopularPlace.findByIdAndUpdate(id, data, { new: true });
};

const deletePopularPlace = async (id: string) => {
  const place = await PopularPlace.findById(id);
  if (!place) {
    throw new AppError(404, "Popular place not found");
  }

  return await PopularPlace.findByIdAndDelete(id);
};
export const popularPlacesService = {
  createPopularPlace,
  getAllPopularPlaces,
  getPopularPlaceById,
  updatePopularPlace,
  deletePopularPlace,
};
