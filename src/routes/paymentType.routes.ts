import { Router } from "express";
import { authRequired } from "../middleware/auth.middleware";
import { PaymentTypeController } from "../controllers/paymentType.controller";

const router = Router();
router.use(authRequired);

router.post("/payment-types", PaymentTypeController.create);
router.get("/payment-types", PaymentTypeController.list);
router.get("/payment-types/:id", PaymentTypeController.getById);
router.put("/payment-types/:id", PaymentTypeController.update);
router.delete("/payment-types/:id", PaymentTypeController.remove);

export default router;
