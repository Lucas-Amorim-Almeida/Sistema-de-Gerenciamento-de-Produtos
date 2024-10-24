import UserController from "@/controllers/UserController";
import userAuth from "@/middlewares/userAuth.middleware";
import { Router } from "express";

const userRoutes = Router();

userRoutes.post("/", UserController.createUser);
userRoutes.post("/login", UserController.login);
userRoutes.post("/password/:id", userAuth, UserController.changePassword);
userRoutes.delete("/:id", userAuth, UserController.deleteUser);

export default userRoutes;
