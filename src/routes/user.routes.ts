import { Router } from "express";
import { authRequired } from "../middleware/auth.middleware";
import { UserController } from "../controllers/user.controller";

const router = Router();
router.use(authRequired);

router.post("/users", UserController.create);
router.get("/users", UserController.list);
router.get("/users/:id", UserController.getById);
router.put("/users/:id", UserController.update);
router.delete("/users/:id", UserController.remove);

export default router;
