import UserController from "@/controllers/UserController";
import { Router } from "express";

const userRoutes = Router();

const userController = new UserController();

userRoutes.post("/", userController.createUser);

export default userRoutes;
