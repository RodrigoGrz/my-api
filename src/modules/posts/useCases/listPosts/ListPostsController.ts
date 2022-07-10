import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListPostsUseCase } from "./ListPostsUseCase";

class ListPostsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listPostsController = container.resolve(ListPostsUseCase);

        const posts = await listPostsController.execute();

        return response.json(posts);
    }
}

export { ListPostsController };