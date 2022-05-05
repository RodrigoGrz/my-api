import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUsersRepository {
    create({ name, email, password, avatar }: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findAllNotDeleted(): Promise<User[]>;
    listById(id: string): Promise<User>;
}

export { IUsersRepository };