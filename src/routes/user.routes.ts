import UserController from "@/controllers/UserController";
import { Router } from "express";

const userRoutes = Router();

userRoutes.post("/", UserController.createUser);
userRoutes.post("/login", UserController.login);
userRoutes.post("/password/:id", UserController.changePassword);
userRoutes.delete("/:id", UserController.deleteUser);

export default userRoutes;
