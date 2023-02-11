import { Router } from "express";
import userRouter from "@/routes/user.routes";
import postRouter from "@/routes/post.routes";
import categoryRouter from "@/routes/categories.routes";
import tagsRouter from "@/routes/tags.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/post", postRouter);
router.use("/categories", categoryRouter);
router.use("/tags", tagsRouter);

export default router;