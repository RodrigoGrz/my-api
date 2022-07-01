import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class DeleteUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute(id: string): Promise<void> {
        const userExists = await this.usersRepository.listById(id);

        if (!userExists) {
            throw new Error("The user does not exists!");
        }

        await this.usersRepository.disable(id);
    }
}

export { DeleteUserUseCase };