import { Router } from "express";
import { authRequired } from "../middleware/auth.middleware";
import { CartController } from "../controllers/cart.controller";

const router = Router();
router.use(authRequired);

router.post("/carts", CartController.create);
router.get("/carts", CartController.list);
router.get("/carts/:id", CartController.getById);
router.put("/carts/:id", CartController.update);
router.delete("/carts/:id", CartController.remove);

export default router;
