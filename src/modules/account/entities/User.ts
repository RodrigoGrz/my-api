import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity('users')
class User {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    created_by: string;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    updated_by: string;

    @DeleteDateColumn()
    deleted_at: Date;

    @Column()
    deleted_by: string;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}

export { User };