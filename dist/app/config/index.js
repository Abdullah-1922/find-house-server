"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), ".env")) });
exports.default = {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUND,
    admin_email: process.env.ADMIN_EMAIL,
    admin_password: process.env.ADMIN_PASSWORD,
    admin_first_name: process.env.ADMIN_FIRST_NAME,
    admin_second_name: process.env.ADMIN_SECOND_NAME,
    admin_provider: process.env.ADMIN_PROVIDER,
    admin_image: process.env.ADMIN_IMAGE,
    frontend_local_url: process.env.FRONTEND_LOCAL_URL,
    frontend_live_url: process.env.FRONTEND_LIVE_URL,
    backend_live_url: process.env.BACKEND_LIVE_URL,
    backend_local_url: process.env.BACKEND_LOCAL_URL,
    payment_verify_url: process.env.PAYMENT_VERIFY_URL,
    aamarpay_url: process.env.AMARPAY_URL,
    store_id: process.env.STORE_ID,
    signature_key: process.env.SIGNATURE_KEY,
};
