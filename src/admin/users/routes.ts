import { Router } from "express";
import * as controller from "./controller";

const router = Router();

router.get("/", controller.getAllUsers);
router.get("/:id", controller.getUserById);
router.delete("/:id", controller.deleteUser);

export default router;
