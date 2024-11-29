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
exports.CommentServices = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const comment_model_1 = require("./comment.model");
const user_model_1 = require("../User/user.model");
const mongoose_1 = __importDefault(require("mongoose"));
const property_model_1 = __importDefault(require("../property/property.model"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const createComment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { propertyId, userId } = payload;
    const propertyData = yield property_model_1.default.findById(propertyId);
    const userData = yield user_model_1.User.findById(userId);
    if (!propertyData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid property Id");
    }
    if (!userData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid userId");
    }
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const [newComment] = yield comment_model_1.Comment.create([Object.assign({}, payload)], { session });
        yield property_model_1.default.findByIdAndUpdate(propertyId, { $push: { comment: newComment._id } }, { new: true, session });
        yield session.commitTransaction();
        session.endSession();
        return newComment;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Failed to create comment");
    }
});
const getCommentForProperty = (propertyId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const property = yield property_model_1.default.findById(propertyId);
    if (!property) {
        throw new AppError_1.default(404, "Invalid property Id");
    }
    const propertyComment = new QueryBuilder_1.default(comment_model_1.Comment.find({ propertyId }).populate(["userId"]), query)
        .search(["comment"])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield propertyComment.modelQuery;
    const meta = yield propertyComment.countTotal();
    return { meta, result };
});
exports.CommentServices = {
    createComment,
    getCommentForProperty,
};
