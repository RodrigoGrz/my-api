import { getRepository, IsNull, Repository } from "typeorm";
import { ICreatePostsDTO } from "../../dtos/ICreatePostsDTO";
import { Post } from "../../entities/Post";
import { IPostsRepository } from "../IPostsRepository";

class PostsRepository implements IPostsRepository {
    private repository: Repository<Post>;

    constructor() {
        this.repository = getRepository(Post);
    }

    async create({ user_id, title, description }: ICreatePostsDTO): Promise<void> {
        const post = this.repository.create({
            user_id,
            title,
            description
        });

        await this.repository.save(post);
    }

    async listByTitle(title: string): Promise<Post[]> {
        return await this.repository.find({
            where: {
                title,
                deleted_at: IsNull()
            }
        });
    }
}

export { PostsRepository };