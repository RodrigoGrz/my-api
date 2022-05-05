import { inject, injectable } from "tsyringe";

import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class ListUsersUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute(email?: string): Promise<User | User[]> {
        const users = await this.usersRepository.findUser(email);

        return users;
    }
}

export { ListUsersUseCase };