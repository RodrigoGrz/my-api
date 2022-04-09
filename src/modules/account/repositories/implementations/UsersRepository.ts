import { getRepository, IsNull, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({ name, email, password, avatar, created_by, updated_by }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            password,
            avatar,
            created_by,
            updated_by
        });

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        return await this.repository.findOne({
            where: {
                email,
                deleted_at: IsNull()
            }
        });
    }

    async findAllNotDeleted(): Promise<User[]> {
        return await this.repository.find({
            where: {
                deleted_at: IsNull()
            }
        });
    }
}

export { UsersRepository };