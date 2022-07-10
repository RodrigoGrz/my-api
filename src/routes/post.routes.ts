import { Router } from "express";

import { CreatePostController } from "../modules/posts/useCases/createPost/CreatePostController";
import { DeletePostController } from "../modules/posts/useCases/deletePost/DeletePostController";
import { ListPostsController } from "../modules/posts/useCases/listPosts/ListPostsController";

const postRoutes = Router();

const listPostsController = new ListPostsController();
const createPostController = new CreatePostController();
const deletePostController = new DeletePostController();

postRoutes.get("/posts", listPostsController.handle);
postRoutes.post("/post", createPostController.handle);
postRoutes.delete("/post/:id", deletePostController.handle);

export { postRoutes };