import { UsersRepositoryInMemory } from "../../../account/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../../../account/useCases/createUser/CreateUserUseCase";
import { PostsRepositoryInMemory } from "../../repositories/in-memory/PostsRepositoryInMemory";
import { CreatePostUseCase } from "../createPost/CreatePostUseCase";
import { DeletePostUseCase } from "./DeletePostUseCase";

let deletePostUseCase: DeletePostUseCase;
let createPostUseCase: CreatePostUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let postsRepositoryInMemory: PostsRepositoryInMemory;

describe("Disable Post", () => {
    beforeEach(async () => {
        postsRepositoryInMemory = new PostsRepositoryInMemory();
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createPostUseCase = new CreatePostUseCase(postsRepositoryInMemory, usersRepositoryInMemory);
        deletePostUseCase = new DeletePostUseCase(postsRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);

        await createUserUseCase.execute({
            name: "User example",
            email: "user@email.com",
            password: "1234"
        });

        const user = await usersRepositoryInMemory.findByEmail("user@email.com");

        await createPostUseCase.execute({
            title: "Title example",
            description: "Description example",
            user_id: user.id
        });
    });

    it("should be able to disable a post", async () => {
        const post = await postsRepositoryInMemory.listByTitle("Title example");

        await deletePostUseCase.execute(post[0].id);

        const postDisable = await postsRepositoryInMemory.listByTitle("Title example");

        expect(postDisable[0]).toHaveProperty("deleted_at")
        expect(postDisable[0].deleted_at).not.toBe(null);
    });

    it("should not be able to disable a post that the id is incorrect", async () => {
        await expect(deletePostUseCase.execute("Random ID"))
            .rejects.toEqual(new Error("This post does not exists!"));
    });

    it("should not be able to disable a post if post already disabled", async () => {
        const post = await postsRepositoryInMemory.listByTitle("Title example");

        await deletePostUseCase.execute(post[0].id);

        await expect(deletePostUseCase.execute(post[0].id))
            .rejects.toEqual(new Error("This post already disabled!"));
    });
});