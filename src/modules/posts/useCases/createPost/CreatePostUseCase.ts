import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../../account/repositories/IUsersRepository";
import { ICreatePostsDTO } from "../../dtos/ICreatePostsDTO";
import { IPostsRepository } from "../../repositories/IPostsRepository";

@injectable()
class CreatePostUseCase {
    constructor(
        @inject("PostsRepository")
        private postRepository: IPostsRepository,

        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ title, description, user_id }: ICreatePostsDTO): Promise<void> {
        if (!title) {
            throw new Error("The field title do not to be empty");
        }

        if (!description) {
            throw new Error("The field description do not to be empty");
        }

        if (!user_id) {
            throw new Error("The field user do not to be empty");
        }

        const userExists = await this.usersRepository.listById(user_id);

        if (!userExists) {
            throw new Error("User does not exists!");
        }

        await this.postRepository.create({
            title,
            description,
            user_id
        });
    }
}

export { CreatePostUseCase };