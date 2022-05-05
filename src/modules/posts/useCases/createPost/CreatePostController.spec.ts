import request from 'supertest';
import { Connection } from 'typeorm';
import { app } from '../../../../app';

import { UsersRepository } from '../../../account/repositories/typeorm/UsersRepository';

import createConnection from '../../../../database';

let usersRepository: UsersRepository;

let connection: Connection;

describe("Create Post Controller", () => {
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

    it('should be able to create a new post', async () => {
        jest.setTimeout(10 * 1000);

        const user = await usersRepository.findByEmail("email@supertest.com");

        const response = await request(app).post("/post").send({
            title: "Title example",
            description: "Description example",
            user_id: user.id
        });

        expect(response.status).toBe(201);
    });
});