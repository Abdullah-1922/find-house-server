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
exports.UserService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const auth_model_1 = __importDefault(require("../Auth/auth.model"));
const user_constant_1 = require("./user.constant");
const user_model_1 = require("./user.model");
const findUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ auth: userId }).populate("auth");
    return result;
});
const getAllUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new QueryBuilder_1.default(user_model_1.User.find().populate("auth"), query)
        .search(user_constant_1.UserSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield userQuery.modelQuery;
    const metaData = yield userQuery.countTotal();
    return {
        meta: metaData,
        data: result,
    };
});
const updateUserById = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(userId, payload, {
        new: true,
    });
    return result;
});
const deleteUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndDelete(userId);
    return result;
});
const updateRole = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate({ _id: userId }, { role }, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.default(404, "User not found");
    }
    if (result === null || result === void 0 ? void 0 : result.auth) {
        yield auth_model_1.default.findByIdAndUpdate(result === null || result === void 0 ? void 0 : result.auth, { role });
    }
    return result;
});
const getRoleBasedUser = (role, query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new QueryBuilder_1.default(user_model_1.User.find({ role }).populate("auth"), query)
        .search(user_constant_1.UserSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield userQuery.modelQuery;
    const metaData = yield userQuery.countTotal();
    return {
        meta: metaData,
        data: result,
    };
});
exports.UserService = {
    findUserById,
    getAllUsers,
    updateUserById,
    deleteUserById,
    updateRole,
    getRoleBasedUser,
};
