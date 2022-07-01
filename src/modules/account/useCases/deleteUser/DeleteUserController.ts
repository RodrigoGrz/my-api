import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

class DeleteUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteuserUseCase = container.resolve(DeleteUserUseCase);

        await deleteuserUseCase.execute(id);

        return response.status(200).send();
    }
}

export { DeleteUserController };