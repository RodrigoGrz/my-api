import { Router } from "express";

import { CreateUserController } from "./modules/account/useCases/createUser/CreateUserController";
import { ListUsersController } from "./modules/account/useCases/listUsers/ListUsersController";

const router = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();

router.post("/user", createUserController.handle);
router.get("/users", listUsersController.handle);

export { router };