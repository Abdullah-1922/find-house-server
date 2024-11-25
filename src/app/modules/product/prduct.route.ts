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
  "/:id",
  validateRequest(ProductValidation.UpdateProductValidationSchema),
  ProductControllers.updateProduct,
);
router.delete("/:id", ProductControllers.deleteProduct);

export const ProductRoutes = router;
