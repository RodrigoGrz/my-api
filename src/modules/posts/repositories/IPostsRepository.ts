import { ICreatePosts } from "../dtos/ICreatePosts";

interface IPostsRepository {
    create({ user_id, title, description }: ICreatePosts): Promise<void>;
}

export { IPostsRepository };