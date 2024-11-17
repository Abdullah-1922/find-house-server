import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";

import { UserRoutes } from "../modules/User/user.route";
import { PropertyRoutes } from "../modules/property/property.route";
import { CommentRoutes } from "../modules/comment/comment.route";
import { BlogRoutes } from "../modules/Blog/blog.route";
import { BlogCommentRoutes } from "../modules/blog comment/blogComment.route";

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
    path: "/comment",
    route: CommentRoutes,
  },
  {
    path: "/blog-comment",
    route: BlogCommentRoutes,
  },
  {
    path: "/blog",
    route: BlogRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
