import request from 'supertest';
import { Connection } from 'typeorm';
import { app } from '../../../../app';

import { UsersRepository } from '../../../account/repositories/typeorm/UsersRepository';

import createConnection from '../../../../database';
import { PostsRepository } from '../../repositories/typeorm/PostsRepository';

let usersRepository: UsersRepository;
let postsRepository: PostsRepository;

let connection: Connection;

describe("Delete Post Controller", () => {
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

    it('should be able to delete a new post', async () => {
        jest.setTimeout(10 * 1000);

        postsRepository = new PostsRepository();

        const user = await usersRepository.findByEmail("email@supertest.com");

        await request(app).post("/post").send({
            title: "Title example",
            description: "Description example",
            user_id: user.id
        });

        const post = await postsRepository.listByTitle("Title example");

        const response = await request(app).delete(`/post/${post[0].id}`);

        expect(response.status).toBe(200);
    });
});