import { Router } from "express";
import * as controller from "./controller";

const router = Router();

router.get("/", controller.getAllCategories);
router.post("/", controller.createCategory);
router.put("/:id", controller.updateCategory);
router.delete("/:id", controller.deleteCategory);

export default router;
