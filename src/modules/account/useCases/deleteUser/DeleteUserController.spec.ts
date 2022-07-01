import request from 'supertest';
import { Connection } from 'typeorm';
import { app } from '../../../../app';

import createConnection from '../../../../database';
import { UsersRepository } from '../../repositories/typeorm/UsersRepository';

let connection: Connection;

let usersRepository: UsersRepository;

describe("Delete user controller", () => {
    beforeEach(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        usersRepository = new UsersRepository();

        await request(app).post("/user").send({
            name: "User SuperTest",
            email: "email@supertest.com",
            password: "1234",
        });
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able to delete a user", async () => {
        jest.setTimeout(10 * 1000);

        const user = await usersRepository.findByEmail("email@supertest.com");

        const response = await request(app).delete(`/user/${user.id}`);

        expect(response.status).toBe(200);
    });
});