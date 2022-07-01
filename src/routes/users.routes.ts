import { Router } from "express";

import { CreateUserController } from "../modules/account/useCases/createUser/CreateUserController";
import { DeleteUserController } from "../modules/account/useCases/deleteUser/DeleteUserController";
import { ListUsersController } from "../modules/account/useCases/listUsers/ListUsersController";

const userRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const deleteUserController = new DeleteUserController();

userRoutes.post("/user", createUserController.handle);
userRoutes.get("/users", listUsersController.handle);
userRoutes.delete("/user/:id", deleteUserController.handle);

export { userRoutes };