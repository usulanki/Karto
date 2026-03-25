import { Router } from "express";
import * as controller from "./controller";
import { checkPermission } from "../../shared/middleware/permissionMiddleware";

const router = Router();

router.get("/all", checkPermission("/roles"), controller.getAll);
router.get("/", checkPermission("/roles"), controller.list);
router.post("/", checkPermission("/roles"), controller.create);
router.put("/:id", checkPermission("/roles"), controller.update);
router.delete("/:id", checkPermission("/roles"), controller.remove);
router.patch("/:id/status", checkPermission("/roles"), controller.changeStatus);

export default router;
