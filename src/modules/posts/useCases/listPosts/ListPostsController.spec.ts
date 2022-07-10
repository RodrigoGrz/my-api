import request from 'supertest';

import { Connection } from "typeorm";
import { app } from '../../../../app';

import createConnection from '../../../../database';

let connection: Connection;

describe("List Posts Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        await request(app).post("/user").send({
            name: "User SuperTest",
            email: "email@supertest.com",
            password: "1234",
        });

        const user = await request(app).get("/users?email=email@supertest.com");

        await request(app).post("/post").send({
            title: "Title SuperTest",
            description: "Description SuperTest",
            user_id: user.body[0].id
        });
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able to list all posts", async () => {
        const response = await request(app).get("/posts");

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("id");
    });
});