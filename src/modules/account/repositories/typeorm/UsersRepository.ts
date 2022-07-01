import { getRepository, IsNull, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({ name, email, password, avatar }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            password,
            avatar,
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

    async findUser(email?: string): Promise<User | User[]> {
        const userQuery = this.repository
            .createQueryBuilder("users")

        if (email) {
            userQuery.andWhere("users.email = :email", { email })
        }

        const user = await userQuery.getMany();

        return user;
    }

    async listById(id: string): Promise<User> {
        return await this.repository.findOne(id);
    }

    async disable(id: string): Promise<void> {
        await this.repository
            .createQueryBuilder("users")
            .update()
            .set({ deleted_at: new Date() })
            .where("users.id = :id")
            .setParameters({ id })
            .execute();
    }
}

export { UsersRepository };