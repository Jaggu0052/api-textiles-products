import { Router } from "express";
import { authRequired } from "../middleware/auth.middleware";
import { FavoriteController } from "../controllers/favorite.controller";

const router = Router();
router.use(authRequired);

router.post("/favorites", FavoriteController.create);
router.get("/favorites", FavoriteController.list);
router.get("/favorites/:id", FavoriteController.getById);
router.put("/favorites/:id", FavoriteController.update);
router.delete("/favorites/:id", FavoriteController.remove);

export default router;
