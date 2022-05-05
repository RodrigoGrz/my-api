import { Router } from "express";

import { CreatePostController } from "../modules/posts/useCases/createPost/CreatePostController";

const postRoutes = Router();

const createPostController = new CreatePostController();

postRoutes.post("/post", createPostController.handle);

export { postRoutes };