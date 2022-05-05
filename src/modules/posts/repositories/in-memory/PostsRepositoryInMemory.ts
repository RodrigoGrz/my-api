import { ICreatePostsDTO } from "../../dtos/ICreatePostsDTO";
import { Post } from "../../entities/Post";
import { IPostsRepository } from "../IPostsRepository";

class PostsRepositoryInMemory implements IPostsRepository {
    private posts: Post[] = [];

    async create({ user_id, title, description }: ICreatePostsDTO): Promise<void> {
        const post = new Post();

        Object.assign(post, {
            user_id,
            title,
            description
        });

        this.posts.push(post);
    }

    async listByTitle(title: string): Promise<Post[]> {
        const post = this.posts.filter(post => post.title === title);

        return post;
    }
}

export { PostsRepositoryInMemory };