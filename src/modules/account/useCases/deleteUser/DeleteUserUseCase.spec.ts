import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let deleteUserUseCase: DeleteUserUseCase;

describe("Disable User", () => {
    beforeEach(async () => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        deleteUserUseCase = new DeleteUserUseCase(usersRepositoryInMemory);

        await createUserUseCase.execute({
            name: "User example",
            email: "user@email.com",
            password: "1234"
        });
    });

    it("should be able to disable a user", async () => {
        const user = await usersRepositoryInMemory.findByEmail("user@email.com");

        await deleteUserUseCase.execute(user.id);

        const userDisable = await usersRepositoryInMemory.findByEmail("user@email.com");

        expect(userDisable).toHaveProperty("deleted_at");
        expect(userDisable.deleted_at).not.toBe(null);
    });

    it("should not be able to disable a user with id incorrect", async () => {
        await expect(deleteUserUseCase.execute("Random ID"))
            .rejects.toEqual(new Error("The user does not exists!"));
    });
});