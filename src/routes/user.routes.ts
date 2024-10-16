import UserController from "@/controllers/UserController";
import { Router } from "express";

const userRoutes = Router();

const userController = new UserController();

userRoutes.post("/", userController.createUser);
userRoutes.post("/login", userController.login);
userRoutes.post("/password/:id", userController.changePassword);

export default userRoutes;