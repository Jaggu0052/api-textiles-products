import { Router } from "express";
import { authRequired } from "../middleware/auth.middleware";
import { ProductController } from "../controllers/product.controller";

const router = Router();
router.use(authRequired);

router.post("/products", ProductController.create);
router.get("/products", ProductController.list);
router.get("/products/:id", ProductController.getById);
router.put("/products/:id", ProductController.update);
router.delete("/products/:id", ProductController.remove);

export default router;
