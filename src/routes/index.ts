import { Router } from "express";

import { postRoutes } from "./post.routes";
import { userRoutes } from "./users.routes";

const router = Router();

router.use(userRoutes);
router.use(postRoutes);

export { router };