import { Router } from "express";
import * as controller from "./controller";
import { checkPermission } from "../../shared/middleware/permissionMiddleware";

const router = Router();

router.get("/all", checkPermission("/categories"), controller.getAll);
router.get("/", checkPermission("/categories"), controller.list);
router.get("/:id", checkPermission("/categories"), controller.getById);
router.post("/", checkPermission("/categories"), controller.create);
router.put("/:id", checkPermission("/categories"), controller.update);

export default router;
