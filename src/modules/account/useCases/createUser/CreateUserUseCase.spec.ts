import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Create User UseCase", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("should be able to create a new user", async () => {
        const user: ICreateUserDTO = {
            name: "User sample",
            email: "email@test.com",
            password: "1234",
        }

        await createUserUseCase.execute({
            name: user.name,
            email: user.email,
            password: user.password
        });

        const findUser = await usersRepositoryInMemory.findByEmail(user.email);

        expect(findUser).toHaveProperty("id");
    });

    it("should not be able to create a new user if the same email", async () => {
        const user: ICreateUserDTO = {
            name: "User sample",
            email: "email@test.com",
            password: "1234",
        }

        await createUserUseCase.execute({
            name: user.name,
            email: user.email,
            password: user.password
        });

        await expect(createUserUseCase.execute({
            name: user.name,
            email: user.email,
            password: user.password
        })).rejects.toEqual(new Error("User already exists!"));
    });

    it("should not be able to create a new user with email field empty", async () => {
        const user: ICreateUserDTO = {
            name: "User sample",
            email: "",
            password: "1234",
        }

        await expect(createUserUseCase.execute({
            name: user.name,
            email: user.email,
            password: user.password
        })).rejects.toEqual(new Error("The field email do not to be empty"));
    });

    it("should not be able to create a new user with password field empty", async () => {
        const user: ICreateUserDTO = {
            name: "User sample",
            email: "email@test.com",
            password: "",
        }

        await expect(createUserUseCase.execute({
            name: user.name,
            email: user.email,
            password: user.password
        })).rejects.toEqual(new Error("The field password do not to be empty"));
    });

    it("should not be able to create a new user with name field empty", async () => {
        const user: ICreateUserDTO = {
            name: "",
            email: "email@test.com",
            password: "1234",
        }

        await expect(createUserUseCase.execute({
            name: user.name,
            email: user.email,
            password: user.password
        })).rejects.toEqual(new Error("The field name do not to be empty"));
    });
});