import { Router } from "express";
import { authRequired } from "../middleware/auth.middleware";
import { PaymentController } from "../controllers/payment.controller";

const router = Router();
router.use(authRequired);

router.post("/payments", PaymentController.create);
router.get("/payments", PaymentController.list);
router.get("/payments/:id", PaymentController.getById);
router.put("/payments/:id", PaymentController.update);
router.delete("/payments/:id", PaymentController.remove);

export default router;
