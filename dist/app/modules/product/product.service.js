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
exports.ProductServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../User/user.model");
const product_model_1 = require("./product.model");
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(payload.admin);
    if (!user) {
        throw new AppError_1.default(404, "Admin user not found");
    }
    const product = yield product_model_1.Product.create(payload);
    return product;
});
const getAllProducts = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const productQuery = new QueryBuilder_1.default(product_model_1.Product.find().populate("admin").populate("review"), query)
        .search(["name", "description", "category"])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield productQuery.modelQuery;
    const meta = yield productQuery.countTotal();
    return { result, meta };
});
const getAllProductsForAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find().populate("admin").populate("review");
    return result;
});
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findById(id).populate("admin");
    if (!product) {
        throw new AppError_1.default(404, "Product not found");
    }
    return product;
});
const updateProduct = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findById(id);
    if (!product) {
        throw new AppError_1.default(404, "Product not found");
    }
    const updatedProduct = yield product_model_1.Product.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return updatedProduct;
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findByIdAndDelete(id);
    if (!product) {
        throw new AppError_1.default(404, "Product not found");
    }
    return product;
});
const addProductFavorite = (productId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate productId and userId
    if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
        throw new AppError_1.default(400, "Invalid product ID format");
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
        throw new AppError_1.default(400, "Invalid user ID format");
    }
    const product = yield product_model_1.Product.findById(productId);
    if (!product) {
        throw new AppError_1.default(404, "Product not found");
    }
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    // Add product to user's favorites if not already present
    if (!product.favoriteBy.includes(user._id)) {
        product.favoriteBy.push(user._id);
        yield product.save();
    }
    if (!user.favoriteProducts.includes(product._id)) {
        user.favoriteProducts.push(product._id);
        yield user.save();
    }
    return product;
});
const removeProductFavorite = (productId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate IDs
    if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
        throw new AppError_1.default(400, "Invalid product ID format");
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
        throw new AppError_1.default(400, "Invalid user ID format");
    }
    // Find product and user
    const product = yield product_model_1.Product.findById(productId);
    if (!product) {
        throw new AppError_1.default(404, "Product not found");
    }
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    // Remove product from user's favorites and user from product's favorites
    product.favoriteBy = product.favoriteBy.filter((favoriteUserId) => !favoriteUserId.equals(user._id));
    yield product.save();
    user.favoriteProducts = user.favoriteProducts.filter((favoriteProductId) => !favoriteProductId.equals(product._id));
    yield user.save();
    return product;
});
const getMyFavoriteProducts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
        throw new AppError_1.default(400, "Invalid user ID format");
    }
    // Find user and populate favorite products
    const user = yield user_model_1.User.findById(userId).populate("favoriteProducts");
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    return user.favoriteProducts;
});
exports.ProductServices = {
    createProduct,
    getAllProducts,
    getAllProductsForAdmin,
    getProductById,
    updateProduct,
    deleteProduct,
    addProductFavorite,
    removeProductFavorite,
    getMyFavoriteProducts,
};
