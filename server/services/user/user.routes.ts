import express from "express";
import protect from "../../middleware/authMiddleware";
import { getMe, getUser, loginUser, registerUser } from "./user.controller";

const UserRoutes = express.Router();

UserRoutes.route("/").post(registerUser);
UserRoutes.post("/login", loginUser);
UserRoutes.get("/me", protect, getMe);
UserRoutes.get("/:id", protect, getUser);

export default UserRoutes;
