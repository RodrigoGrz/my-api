import { ICreateUserDTO } from "../../../account/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../../account/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../../../account/useCases/createUser/CreateUserUseCase";
import { ICreatePostsDTO } from "../../dtos/ICreatePostsDTO";
import { PostsRepositoryInMemory } from "../../repositories/in-memory/PostsRepositoryInMemory";
import { CreatePostUseCase } from "./CreatePostUseCase";

let createPostUseCase: CreatePostUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let postsRepositoryInMemory: PostsRepositoryInMemory;

describe("Create a new post", () => {
    beforeEach(() => {
        postsRepositoryInMemory = new PostsRepositoryInMemory
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createPostUseCase = new CreatePostUseCase(postsRepositoryInMemory, usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("should be able create a new post", async () => {
        const user: ICreateUserDTO = {
            name: "User example",
            email: "email@test.com",
            password: "1234",
        }

        await createUserUseCase.execute({
            name: user.name,
            email: user.email,
            password: user.password
        });

        const userExists = await usersRepositoryInMemory.findByEmail(user.email);

        const post: ICreatePostsDTO = {
            title: "Title example",
            description: "Description example",
            user_id: userExists.id,
        }

        await createPostUseCase.execute({
            title: post.title,
            description: post.description,
            user_id: post.user_id
        });

        const findPost = await postsRepositoryInMemory.listByTitle(post.title);

        expect(findPost[0]).toHaveProperty("id");
    });

    it("should not be able to create a new post if user does not exists", async () => {
        const post: ICreatePostsDTO = {
            title: "Title example",
            description: "Description example",
            user_id: "Random ID",
        }

        await expect(createPostUseCase.execute({
            title: post.title,
            description: post.description,
            user_id: post.user_id
        })).rejects.toEqual(new Error("User does not exists!"));
    });

    it("should not be able to create a new post with title field empty", async () => {
        const post: ICreatePostsDTO = {
            title: "",
            description: "Description example",
            user_id: "Random ID",
        }

        await expect(createPostUseCase.execute({
            title: post.title,
            description: post.description,
            user_id: post.user_id
        })).rejects.toEqual(new Error("The field title do not to be empty"));
    });

    it("should not be able to create a new post with description field empty", async () => {
        const post: ICreatePostsDTO = {
            title: "Title example",
            description: "",
            user_id: "Random ID",
        }

        await expect(createPostUseCase.execute({
            title: post.title,
            description: post.description,
            user_id: post.user_id
        })).rejects.toEqual(new Error("The field description do not to be empty"));
    });

    it("should not be able to create a new post with user_id field empty", async () => {
        const post: ICreatePostsDTO = {
            title: "Title example",
            description: "Description example",
            user_id: "",
        }

        await expect(createPostUseCase.execute({
            title: post.title,
            description: post.description,
            user_id: post.user_id
        })).rejects.toEqual(new Error("The field user do not to be empty"));
    });
});