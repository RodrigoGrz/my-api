import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUsersUseCase } from "./ListUsersUseCase";

class ListUsersController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.query;

        const listUsersUseCase = container.resolve(ListUsersUseCase);

        const users = await listUsersUseCase.execute(email as string);

        return response.json(users);
    }
}

export { ListUsersController };