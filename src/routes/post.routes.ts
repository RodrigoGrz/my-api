import { Router } from "express";

import { CreatePostController } from "../modules/posts/useCases/createPost/CreatePostController";
import { DeletePostController } from "../modules/posts/useCases/deletePost/DeletePostController";

const postRoutes = Router();

const createPostController = new CreatePostController();
const deletePostController = new DeletePostController();

postRoutes.post("/post", createPostController.handle);
postRoutes.delete("/post/:id", deletePostController.handle);

export { postRoutes };