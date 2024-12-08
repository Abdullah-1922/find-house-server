"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.popularPlacesService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const popularPlaces_model_1 = require("./popularPlaces.model");
const createPopularPlace = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield popularPlaces_model_1.PopularPlace.create(data);
});
const getAllPopularPlaces = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const QueryPlaces = new QueryBuilder_1.default(popularPlaces_model_1.PopularPlace.find(), query)
        .search(["location"])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield QueryPlaces.modelQuery;
    const total = yield QueryPlaces.countTotal();
    return { result, total };
});
const getPopularPlaceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield popularPlaces_model_1.PopularPlace.findById(id);
});
const updatePopularPlace = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const place = yield popularPlaces_model_1.PopularPlace.findById(id);
    if (!place) {
        throw new AppError_1.default(404, "Popular place not found");
    }
    return yield popularPlaces_model_1.PopularPlace.findByIdAndUpdate(id, data, { new: true });
});
const deletePopularPlace = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const place = yield popularPlaces_model_1.PopularPlace.findById(id);
    if (!place) {
        throw new AppError_1.default(404, "Popular place not found");
    }
    return yield popularPlaces_model_1.PopularPlace.findByIdAndDelete(id);
});
exports.popularPlacesService = {
    createPopularPlace,
    getAllPopularPlaces,
    getPopularPlaceById,
    updatePopularPlace,
    deletePopularPlace,
};
