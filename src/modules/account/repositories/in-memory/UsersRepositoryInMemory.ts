import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async create({ name, email, password, avatar }: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            name,
            email,
            password,
            avatar
        });

        this.users.push(user);
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find(user => user.email === email);
    }

    async findAllNotDeleted(): Promise<User[]> {
        return this.users.filter(user => user.deleted_at === null);
    }

    async listById(id: string): Promise<User> {
        return this.users.find(user => user.id === id);
    }
}

export { UsersRepositoryInMemory };