import { Router } from "express";

import { CreateUserController } from "../modules/account/useCases/createUser/CreateUserController";
import { ListUsersController } from "../modules/account/useCases/listUsers/ListUsersController";

const userRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();

userRoutes.post("/user", createUserController.handle);
userRoutes.get("/users", listUsersController.handle);

export { userRoutes };