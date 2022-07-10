import { UsersRepositoryInMemory } from "../../../account/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../../../account/useCases/createUser/CreateUserUseCase";
import { PostsRepositoryInMemory } from "../../repositories/in-memory/PostsRepositoryInMemory";
import { CreatePostUseCase } from "../createPost/CreatePostUseCase";
import { ListPostsUseCase } from "./ListPostsUseCase";

let listPostsUseCase: ListPostsUseCase;
let createPostUseCase: CreatePostUseCase;
let createUsersUseCase: CreateUserUseCase;
let postsRepositoryInMemory: PostsRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("List Post", () => {
    beforeAll(async () => {
        postsRepositoryInMemory = new PostsRepositoryInMemory();
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUsersUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        createPostUseCase = new CreatePostUseCase(postsRepositoryInMemory, usersRepositoryInMemory);
        listPostsUseCase = new ListPostsUseCase(postsRepositoryInMemory);

        await createUsersUseCase.execute({
            name: "User example",
            email: "user@example.com",
            password: "1234"
        });

        const user = await usersRepositoryInMemory.findByEmail("user@example.com");

        await createPostUseCase.execute({
            title: "Title example",
            description: "Description example",
            user_id: user.id
        });

        await createPostUseCase.execute({
            title: "Title example 2",
            description: "Description example 2",
            user_id: user.id
        });
    });

    it("should be able to lis all posts", async () => {
        const posts = await listPostsUseCase.execute();

        expect(posts[0]).toHaveProperty("id");
        expect(posts[1]).toHaveProperty("id");
    });
});