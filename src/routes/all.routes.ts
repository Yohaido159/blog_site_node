import { Router } from "express";
import userRouter from "@/routes/user.routes";
import postRouter from "@/routes/post.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/post", postRouter);

export default router;