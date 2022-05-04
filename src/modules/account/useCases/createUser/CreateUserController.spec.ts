import request from 'supertest';
import { Connection } from 'typeorm';
import { app } from '../../../../app';

import createConnection from '../../../../database';

let connection: Connection;

describe("Create User Controller", () => {
    beforeEach(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })

    it('should be able to create a new user', async () => {
        jest.setTimeout(10 * 1000);

        const response = await request(app).post("/user").send({
            name: "User SuperTest",
            email: "email@supertest.com",
            password: "1234",
        });

        expect(response.status).toBe(201);
    });
});