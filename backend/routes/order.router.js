import express from "express";
import {
  addOrder,
  getMyOrders,
  getOders,
  getOrderById,
} from "../controller/order.controller.js";
import { checkAdmin, checkAuth } from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/addorder", checkAuth, addOrder);
router.get("/", checkAuth, checkAdmin, getOders);
router.get("/myorders", checkAuth, getMyOrders);

router.get("/:id", checkAuth, getOrderById);
export default router;
