import { inject, injectable } from "tsyringe";
import { Post } from "../../entities/Post";
import { IPostsRepository } from "../../repositories/IPostsRepository";

@injectable()
class ListPostsUseCase {
    constructor(
        @inject("PostsRepository")
        private postsRepository: IPostsRepository
    ) { }

    async execute(): Promise<Post[]> {
        const posts = await this.postsRepository.listAllNotDeleted();

        return posts;
    }
}

export { ListPostsUseCase };