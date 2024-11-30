"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/Auth/auth.route");
const user_route_1 = require("../modules/User/user.route");
const property_route_1 = require("../modules/property/property.route");
const comment_route_1 = require("../modules/comment/comment.route");
const blog_route_1 = require("../modules/Blog/blog.route");
const blogComment_route_1 = require("../modules/blog comment/blogComment.route");
const product_route_1 = require("../modules/product/product.route");
const productReview_route_1 = require("../modules/product review/productReview.route");
const schedule_route_1 = require("../modules/schedule/schedule.route");
const inquiry_router_1 = require("../modules/inquiry/inquiry.router");
const stats_route_1 = require("../modules/stats/stats.route");
const payment_routes_1 = require("../modules/payment/payment.routes");
const propertyPayment_router_1 = require("../modules/propertyPayment/propertyPayment.router");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/users",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/property",
        route: property_route_1.PropertyRoutes,
    },
    {
        path: "/product",
        route: product_route_1.ProductRoutes,
    },
    {
        path: "/product-review",
        route: productReview_route_1.ProductReviewRoutes,
    },
    {
        path: "/comment",
        route: comment_route_1.CommentRoutes,
    },
    {
        path: "/blog-comment",
        route: blogComment_route_1.BlogCommentRoutes,
    },
    {
        path: "/schedule",
        route: schedule_route_1.ScheduleRoutes,
    },
    {
        path: "/inquiry",
        route: inquiry_router_1.InquiryRoutes,
    },
    {
        path: "/blog",
        route: blog_route_1.BlogRoutes,
    },
    {
        path: "/stats",
        route: stats_route_1.StatsRoutes,
    },
    { path: "/payments", route: payment_routes_1.PaymentRoutes },
    { path: "/property-payment", route: propertyPayment_router_1.PropertyPaymentRoutes },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
