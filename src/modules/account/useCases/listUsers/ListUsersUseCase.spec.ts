import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ListUsersUseCase } from "./ListUsersUseCase";

let listUsersUseCase: ListUsersUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("List User", () => {
    beforeAll(async () => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        listUsersUseCase = new ListUsersUseCase(usersRepositoryInMemory);

        await createUserUseCase.execute({
            name: "User example",
            email: "user@email.com",
            password: "1234"
        });

        await createUserUseCase.execute({
            name: "User example 2",
            email: "user2@email.com",
            password: "1234"
        });
    });

    it("should be able to list all users", async () => {
        const users = await listUsersUseCase.execute();

        expect(users[0]).toHaveProperty("id");
        expect(users[1]).toHaveProperty("id");
    });

    it("should be able to list a user by email", async () => {
        const email = "user@email.com";

        const users = await listUsersUseCase.execute(email);

        expect(users).toHaveProperty("id");
    });
});