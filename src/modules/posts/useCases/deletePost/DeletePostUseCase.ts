import { inject, injectable } from "tsyringe";
import { IPostsRepository } from "../../repositories/IPostsRepository";

@injectable()
class DeletePostUseCase {
    constructor(
        @inject("PostsRepository")
        private postsRepository: IPostsRepository
    ) { }

    async execute(id: string): Promise<void> {
        const postExists = await this.postsRepository.listById(id);

        if (!postExists) {
            throw new Error("This post does not exists!");
        }

        if (postExists.deleted_at !== null) {
            throw new Error("This post already disabled!");
        }

        await this.postsRepository.disable(id);
    }
}

export { DeletePostUseCase };