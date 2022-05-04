import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePosts1649547552922 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "posts",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                    },
                    {
                        name: "title",
                        type: "varchar",
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "deleted_at",
                        type: "timestamp",
                        isNullable: true,
                        default: null,
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKUser",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onUpdate: "SET NULL",
                        onDelete: "SET NULL",
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("posts");
    }

}
