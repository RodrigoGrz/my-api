import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ name, email, password, avatar = "default.png" }: ICreateUserDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new Error("User already exists!");
        }

        const hashPassword = await hash(password, 10);

        await this.usersRepository.create({
            name,
            email,
            password: hashPassword,
            avatar,
        });
    }
}

export { CreateUserUseCase };