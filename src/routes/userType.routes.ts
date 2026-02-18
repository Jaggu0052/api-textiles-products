import { Router } from "express";
import { UserTypeController } from "../controllers/userType.controller";

const router = Router();

router.post("/user-types", UserTypeController.create);
router.get("/user-types", UserTypeController.list);
router.get("/user-types/:id", UserTypeController.getById);
router.put("/user-types/:id", UserTypeController.update);
router.delete("/user-types/:id", UserTypeController.remove);

export default router;
