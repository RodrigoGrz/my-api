import request from 'supertest';

import { Connection } from "typeorm";
import { app } from "../../../../app";

import createConnection from '../../../../database';

let connection: Connection;

describe("List Users Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

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

    it("should be able to list all users", async () => {
        const response = await request(app).get("/users");

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("id");
    });

    it("should be able to list user by email", async () => {
        const response = await request(app).get("/users?email=email@supertest.com");

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("id");
    });
});