import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePostUseCase } from "./CreatePostUseCase";

class CreatePostController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { title, description, user_id } = request.body;

        const createPostUseCase = container.resolve(CreatePostUseCase);

        await createPostUseCase.execute({
            title,
            description,
            user_id,
        });

        return response.status(201).send();
    }
}

export { CreatePostController };