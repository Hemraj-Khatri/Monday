import express from "express";
import {
  deleteUser,
  getUserProfile,
  getUsers,
  login,
  logout,
  signup,
  updateUser,
  updateUserProfile,
} from "../controller/user.controller.js";
import { checkAdmin, checkAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", checkAuth, checkAdmin, getUsers);
router.get("/profile", checkAuth, getUserProfile);
router.put("/profile", checkAuth, updateUserProfile);
router.put("/update/:_id", checkAuth, updateUser);
router.delete("/delete/:_id", checkAuth, deleteUser);
export default router;
