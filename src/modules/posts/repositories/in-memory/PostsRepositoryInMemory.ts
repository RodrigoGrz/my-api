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
            description,
            deleted_at: null
        });

        this.posts.push(post);
    }

    async listByTitle(title: string): Promise<Post[]> {
        const post = this.posts.filter(post => post.title === title);

        return post;
    }

    async listById(id: string): Promise<Post> {
        return this.posts.find(post => post.id === id);
    }

    async disable(id: string): Promise<void> {
        const post = this.posts.find(post => post.id === id);

        if (post) {
            post.deleted_at = new Date();
        }
    }
}

export { PostsRepositoryInMemory };