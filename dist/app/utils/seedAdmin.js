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
exports.adminSeed = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs")); // Import bcryptjs for hashing
const config_1 = __importDefault(require("../config"));
const auth_model_1 = __importDefault(require("../modules/Auth/auth.model"));
const user_model_1 = require("../modules/User/user.model");
const user_utils_1 = require("../modules/User/user.utils");
const adminSeed = () => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        // Check if admin exists in the Auth collection
        const existingAuth = yield auth_model_1.default.findOne({ email: config_1.default.admin_email }, null, { session });
        if (!existingAuth) {
            // Hash the password
            const hashedPassword = yield bcryptjs_1.default.hash(config_1.default.admin_password, 12);
            // Create the Auth document
            const newAuth = yield auth_model_1.default.create([
                {
                    email: config_1.default.admin_email,
                    password: hashedPassword,
                    provider: config_1.default.admin_provider,
                    role: user_utils_1.USER_ROLE.admin,
                },
            ], { session });
            // Create the User document
            yield user_model_1.User.create([
                {
                    auth: newAuth[0]._id,
                    email: config_1.default.admin_email,
                    firstName: config_1.default.admin_first_name,
                    secondName: config_1.default.admin_second_name,
                    image: config_1.default.admin_image,
                    role: user_utils_1.USER_ROLE.admin,
                    paymentHistory: [],
                    property: [],
                },
            ], { session });
            console.log("Admin created successfully...");
        }
        else {
            console.log("Admin already exists, skipping seeding...");
        }
        // Commit the transaction
        yield session.commitTransaction();
        console.log("Seeding completed...");
    }
    catch (error) {
        yield session.abortTransaction();
        console.error("Error in seeding:", error);
    }
    finally {
        session.endSession();
    }
});
exports.adminSeed = adminSeed;
