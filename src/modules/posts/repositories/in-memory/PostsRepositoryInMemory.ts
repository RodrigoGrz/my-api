import { ICreatePosts } from "../../dtos/ICreatePosts";
import { Post } from "../../entities/Post";
import { IPostsRepository } from "../IPostsRepository";

class PostsRepositoryInMemory implements IPostsRepository {
    private posts: Post[] = [];

    async create({ user_id, title, description }: ICreatePosts): Promise<void> {
        const post = new Post();

        Object.assign(post, {
            user_id,
            title,
            description
        });

        this.posts.push(post);
    }
}

export { PostsRepositoryInMemory };