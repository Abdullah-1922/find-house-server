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
exports.StatsServices = void 0;
const blogComment_model_1 = require("../blog comment/blogComment.model");
const blog_model_1 = require("../Blog/blog.model");
const comment_model_1 = require("../comment/comment.model");
const inquiry_model_1 = require("../inquiry/inquiry.model");
const productReview_model_1 = require("../product review/productReview.model");
const product_model_1 = require("../product/product.model");
const property_model_1 = __importDefault(require("../property/property.model"));
const propertyPayment_model_1 = __importDefault(require("../propertyPayment/propertyPayment.model"));
const user_model_1 = require("../User/user.model");
const getAdminStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalUsers = yield user_model_1.User.countDocuments();
    const totalProperties = yield property_model_1.default.countDocuments();
    const totalActiveProperties = yield property_model_1.default.countDocuments({
        status: "active",
    });
    const totalNonActiveProperties = yield property_model_1.default.countDocuments({
        status: "non-active",
    });
    const totalRentProperties = yield property_model_1.default.countDocuments({
        category: "rent",
    });
    const totalSellProperties = yield property_model_1.default.countDocuments({
        category: "sell",
    });
    const totalReviews = (yield comment_model_1.Comment.countDocuments()) + (yield productReview_model_1.ProductReview.countDocuments());
    const totalMessages = yield inquiry_model_1.Inquiry.countDocuments();
    const totalFavoriteProperties = yield property_model_1.default.countDocuments({
        favoriteBy: { $exists: true, $ne: [] },
    });
    const totalProducts = yield product_model_1.Product.countDocuments();
    const totalBlogComments = yield blogComment_model_1.BlogComment.countDocuments();
    const totalBlogs = yield blog_model_1.Blog.countDocuments();
    const totalPayments = yield propertyPayment_model_1.default.countDocuments();
    const stats = {
        totalUsers,
        totalProperties,
        totalActiveProperties,
        totalNonActiveProperties,
        totalRentProperties,
        totalSellProperties,
        totalReviews,
        totalMessages,
        totalFavoriteProperties,
        totalProducts,
        totalBlogComments,
        totalBlogs,
        totalPayments,
    };
    return stats;
});
const getUserStats = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const totalBlogAdded = yield blog_model_1.Blog.countDocuments({ userId: userId });
    const totalBlogComments = yield blogComment_model_1.BlogComment.countDocuments({
        userId: userId,
    });
    const totalPropertyComments = yield comment_model_1.Comment.countDocuments({
        userId: userId,
    });
    const totalFavoriteProperties = yield property_model_1.default.countDocuments({
        favoriteBy: userId,
    });
    const stats = {
        totalFavoriteProperties,
        totalBlogAdded,
        totalBlogComments,
        totalPropertyComments,
    };
    return stats;
});
const getAgentStats = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const totalProperties = yield property_model_1.default.countDocuments({ addedBy: userId });
    const totalBlogAdded = yield blog_model_1.Blog.countDocuments({ userId: userId });
    const totalBlogComments = yield blogComment_model_1.BlogComment.countDocuments({
        userId: userId,
    });
    const totalPropertyComments = yield comment_model_1.Comment.countDocuments({
        userId: userId,
    });
    const totalFavoriteProperties = yield property_model_1.default.countDocuments({
        favoriteBy: userId,
    });
    const stats = {
        totalProperties,
        totalFavoriteProperties,
        totalBlogAdded,
        totalBlogComments,
        totalPropertyComments,
    };
    return stats;
});
const filterStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const maxPrice = yield property_model_1.default.find().sort({ price: -1 }).limit(1).select('price');
    const minPrice = yield property_model_1.default.find().sort({ price: 1 }).limit(1).select('price');
    const maxArea = yield property_model_1.default.find().sort({ area: -1 }).limit(1).select('area');
    const minArea = yield property_model_1.default.find().sort({ area: 1 }).limit(1).select('area');
    const cities = yield property_model_1.default.distinct('location.city');
    const result = ({
        maxPrice: maxPrice[0].price,
        minPrice: minPrice[0].price,
        maxArea: maxArea[0].area,
        minArea: minArea[0].area,
        cities
    });
    return result;
});
exports.StatsServices = {
    getAdminStats,
    getUserStats,
    getAgentStats,
    filterStats
};
