import express from "express";
import {
  addProduct,
  addUserReview,
  deleteProduct,
  getProductById,
  getProducts,
  toTenProduct,
  updateProduct,
} from "../controller/product.controller.js";
import { checkAdmin, checkAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(checkAuth, checkAdmin, addProduct);
router.get("/top-products", toTenProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(checkAuth, checkAdmin, updateProduct)
  .delete(checkAuth, checkAdmin, deleteProduct);
router.put("/:id/addreview", checkAuth, addUserReview);

export default router;
