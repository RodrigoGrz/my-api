import { ICreatePostsDTO } from "../dtos/ICreatePostsDTO";
import { Post } from "../entities/Post";

interface IPostsRepository {
    create({ user_id, title, description }: ICreatePostsDTO): Promise<void>;
    listByTitle(title: string): Promise<Post[]>;
    listById(id: string): Promise<Post>;
    disable(id: string): Promise<void>;
}

export { IPostsRepository };