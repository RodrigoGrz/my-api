import { ICreatePostsDTO } from "../dtos/ICreatePostsDTO";
import { Post } from "../entities/Post";

interface IPostsRepository {
    create({ user_id, title, description }: ICreatePostsDTO): Promise<void>;
    listByTitle(title: string): Promise<Post[]>;
}

export { IPostsRepository };