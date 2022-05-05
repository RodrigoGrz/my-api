import { container } from "tsyringe";

import { IUsersRepository } from "../../modules/account/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/account/repositories/typeorm/UsersRepository";

import { IPostsRepository } from "../../modules/posts/repositories/IPostsRepository";
import { PostsRepository } from "../../modules/posts/repositories/typeorm/PostsRepository";

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<IPostsRepository>(
    "PostsRepository",
    PostsRepository
);