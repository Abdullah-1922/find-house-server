import { Router } from "express";
import { ProductControllers } from "./product.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./product.validation";

const router = Router();

router.post(
  "/",
  validateRequest(ProductValidation.CreateProductValidationSchema),
  ProductControllers.createProduct,
);

router.get("/", ProductControllers.getAllProducts);

router.get("/:id", ProductControllers.getProductById);

router.patch(
  "/add-favorite",
  //   auth(USER_ROLE.user), // Only user can update properties
  ProductControllers.addProductFavorite,
);

router.patch(
  "/remove-favorite",
  //   auth(USER_ROLE.user), // Only user can update properties
  ProductControllers.removeProductFavorite,
);

router.patch(
  "/:id",
  validateRequest(ProductValidation.UpdateProductValidationSchema),
  ProductControllers.updateProduct,
);

router.delete("/:id", ProductControllers.deleteProduct);

router.get(
  "/add-bookmark-product/:userId",
  ProductControllers.getMyFavoriteProducts,
);

export const ProductRoutes = router;
