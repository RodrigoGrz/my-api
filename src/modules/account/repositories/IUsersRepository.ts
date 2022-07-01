import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUsersRepository {
    create({ name, email, password, avatar }: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findAllNotDeleted(): Promise<User[]>;
    findUser(email?: string): Promise<User | User[]>;
    listById(id: string): Promise<User>;
    disable(id: string): Promise<void>;
}

export { IUsersRepository };