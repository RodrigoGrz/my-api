import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUsersRepository {
    create({ name, email, password, avatar, created_by, updated_by }: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findAllNotDeleted(): Promise<User[]>;
}

export { IUsersRepository };