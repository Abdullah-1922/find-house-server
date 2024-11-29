import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";

import { UserRoutes } from "../modules/User/user.route";
import { PropertyRoutes } from "../modules/property/property.route";
import { CommentRoutes } from "../modules/comment/comment.route";
import { BlogRoutes } from "../modules/Blog/blog.route";
import { BlogCommentRoutes } from "../modules/blog comment/blogComment.route";
import { ProductRoutes } from "../modules/product/product.route";
import { ProductReviewRoutes } from "../modules/product review/productReview.route";
import { ScheduleRoutes } from "../modules/schedule/schedule.route";
import { InquiryRoutes } from "../modules/inquiry/inquiry.router";
import { PropertyPaymentRoutes } from "../modules/propertyPayment/propertyPayment.router";
import { StatsRoutes } from '../modules/stats/stats.route';

type TModuleRoutes = {
  path: string;
  route: Router;
};

const router = Router();

const moduleRoutes: TModuleRoutes[] = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/property",
    route: PropertyRoutes,
  },
  {
    path: "/product",
    route: ProductRoutes,
  },
  {
    path: "/product-review",
    route: ProductReviewRoutes,
  },
  {
    path: "/comment",
    route: CommentRoutes,
  },
  {
    path: "/blog-comment",
    route: BlogCommentRoutes,
  },
  {
    path: "/schedule",
    route: ScheduleRoutes,
  },
  {
    path: "/inquiry",
    route: InquiryRoutes,
  },
  {
    path: "/property-payment",
    route: PropertyPaymentRoutes,
  },
  {
    path: "/blog",
    route: BlogRoutes,
  },
  {
    path: "/stats",
    route: StatsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
