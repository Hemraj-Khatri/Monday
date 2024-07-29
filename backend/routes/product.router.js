import express from "express";
import { checkAdmin, checkAuth } from "../middleware/auth.middleware.js";
import {
  addProduct,
  addUserReview,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controller/product.controller.js";

const router = express.Router();

router.route("/").get(getProducts).post(checkAuth, checkAdmin, addProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(checkAuth, checkAdmin, updateProduct)
  .delete(checkAuth, checkAdmin, deleteProduct);
router.put("/addreview/:id", checkAuth, addUserReview);

export default router;
