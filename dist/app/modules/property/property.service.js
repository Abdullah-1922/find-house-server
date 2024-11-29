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
exports.PropertyServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const AppError_1 = __importDefault(require("../../errors/AppError"));
const mongoose_1 = __importDefault(require("mongoose"));
const property_model_1 = __importDefault(require("./property.model"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const user_model_1 = require("../User/user.model");
const createProperty = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.title || !payload.author || !payload.price) {
        throw new AppError_1.default(400, "Missing required fields: title, author, or price");
    }
    const authorExists = yield mongoose_1.default.model("User").findById(payload.author);
    if (!authorExists) {
        throw new AppError_1.default(404, "Author  not found");
    }
    payload.ownedBy = authorExists._id;
    const res = yield property_model_1.default.create(payload);
    if (res) {
        yield user_model_1.User.findByIdAndUpdate(res.ownedBy, {
            $push: { property: res._id },
        });
    }
    return res;
});
// Get all properties with query filters
const getAllProperties = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const propertyQuery = new QueryBuilder_1.default(property_model_1.default.find().populate(["author", "ownedBy"]), query)
        .search(["title", "description", "category", "type"])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield propertyQuery.modelQuery;
    const meta = yield propertyQuery.countTotal();
    return { result, meta };
});
// Get all properties with query filters
const getMyAllProperties = (query, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const propertyQuery = new QueryBuilder_1.default(property_model_1.default.find({ author: userId }).populate(["author", "ownedBy"]), query)
        .search(["title", "description", "category", "type"])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield propertyQuery.modelQuery;
    const meta = yield propertyQuery.countTotal();
    return { result, meta };
});
// Get a single property by ID
const getSingleProperty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new AppError_1.default(400, "Invalid property ID format");
    }
    const property = yield property_model_1.default.findById(id).populate(["author", "ownedBy"]);
    if (!property) {
        throw new AppError_1.default(404, "Property not found");
    }
    return property;
});
const getMyProperties = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new AppError_1.default(400, "Invalid property ID format");
    }
    const propertyQuery = new QueryBuilder_1.default(property_model_1.default.find({ author: id }).populate(["author", "ownedBy"]), query)
        .search(["title", "description", "category", "type"])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield propertyQuery.modelQuery;
    const meta = yield propertyQuery.countTotal();
    return { result, meta };
});
// Update a property by ID
const updateProperty = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new AppError_1.default(400, "Invalid property ID format");
    }
    if (payload.author) {
        throw new AppError_1.default(400, "Author cannot be updated");
    }
    const property = yield property_model_1.default.findById(id);
    if (!property) {
        throw new AppError_1.default(404, "Property not found");
    }
    const updateData = {};
    Object.keys(payload).forEach((key) => {
        if (typeof payload[key] === "object" && !Array.isArray(payload[key])) {
            // Flatten nested objects using dot notation
            Object.entries(payload[key]).forEach(([nestedKey, value]) => {
                updateData[`${key}.${nestedKey}`] = value;
            });
        }
        else {
            // Directly add non-nested fields
            updateData[key] = payload[key];
        }
    });
    const result = yield property_model_1.default.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    return result;
});
// Delete a property by ID
const deleteProperty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new AppError_1.default(400, "Invalid property ID format");
    }
    const property = yield property_model_1.default.findById(id);
    if (!property) {
        throw new AppError_1.default(404, "Property not found");
    }
    const result = yield property_model_1.default.findByIdAndDelete(id);
    return result;
});
const addPropertyFavorite = (propertyId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(propertyId) ||
        !mongoose_1.default.Types.ObjectId.isValid(userId)) {
        throw new AppError_1.default(400, "Invalid property ID or user ID format");
    }
    const property = yield property_model_1.default.findById(propertyId);
    if (!property) {
        throw new AppError_1.default(404, "Property not found");
    }
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    if (!property.favoriteBy.includes(user._id)) {
        property.favoriteBy.push(user._id);
        yield property.save();
    }
    if (!user.favoriteProperties.includes(property._id)) {
        user.favoriteProperties.push(property._id);
        yield user.save();
    }
    return property;
});
const removePropertyFavorite = (propertyId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(propertyId) ||
        !mongoose_1.default.Types.ObjectId.isValid(userId)) {
        throw new AppError_1.default(400, "Invalid property ID or user ID format");
    }
    const property = yield property_model_1.default.findById(propertyId);
    if (!property) {
        throw new AppError_1.default(404, "Property not found");
    }
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    property.favoriteBy = property.favoriteBy.filter((favoriteUserId) => !favoriteUserId.equals(user._id));
    yield property.save();
    user.favoriteProperties = user.favoriteProperties.filter((favoritePropertyId) => !favoritePropertyId.equals(property._id));
    yield user.save();
    return property;
});
const getMyFavoriteProperties = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the user by ID
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    // Check if the user has favorite properties
    if (!user.favoriteProperties || user.favoriteProperties.length === 0) {
        return [];
    }
    const favoriteProperties = yield property_model_1.default.find({
        _id: { $in: user.favoriteProperties },
    });
    return favoriteProperties;
});
exports.PropertyServices = {
    createProperty,
    getMyAllProperties,
    getAllProperties,
    getSingleProperty,
    updateProperty,
    deleteProperty,
    addPropertyFavorite,
    removePropertyFavorite,
    getMyFavoriteProperties,
    getMyProperties,
};
