import { Router } from "express";
import { authRequired } from "../middleware/auth.middleware";
import { StockController } from "../controllers/stock.controller";

const router = Router();
router.use(authRequired);

router.post("/stock", StockController.create);
router.get("/stock", StockController.list);
router.get("/stock/:id", StockController.getById);
router.put("/stock/:id", StockController.update);
router.delete("/stock/:id", StockController.remove);

export default router;
