import { Router } from "express";
import { authRequired } from "../middleware/auth.middleware";
import { OrderController } from "../controllers/order.controller";

const router = Router();
router.use(authRequired);

router.post("/orders", OrderController.create);
router.get("/orders", OrderController.list);
router.get("/orders/:id", OrderController.getById);
router.put("/orders/:id", OrderController.update);
router.delete("/orders/:id", OrderController.remove);

export default router;
