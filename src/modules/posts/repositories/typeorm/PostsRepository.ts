import { getRepository, Repository } from "typeorm";
import { ICreatePosts } from "../../dtos/ICreatePosts";
import { Post } from "../../entities/Post";
import { IPostsRepository } from "../IPostsRepository";

class PostsRepository implements IPostsRepository {
    private repository: Repository<Post>;

    constructor() {
        this.repository = getRepository(Post);
    }

    async create({ user_id, title, description }: ICreatePosts): Promise<void> {
        const post = this.repository.create({
            user_id,
            title,
            description
        });

        await this.repository.save(post);
    }
}

export { PostsRepository };