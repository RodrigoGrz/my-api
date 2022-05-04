import { container } from "tsyringe";

import { IUsersRepository } from "../../modules/account/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/account/repositories/typeorm/UsersRepository";

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);