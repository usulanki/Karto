import { Router } from "express";
import * as controller from "./controller";
import { checkPermission } from "../../shared/middleware/permissionMiddleware";

const router = Router();

router.get("/all", checkPermission("/admins"), controller.getAll);
router.get("/", checkPermission("/admins"), controller.list);
router.post("/", checkPermission("/admins"), controller.create);
router.put("/:id", checkPermission("/admins"), controller.update);
router.patch("/:id/status", checkPermission("/admins"), controller.changeStatus);
router.delete("/:id", checkPermission("/admins"), controller.remove);

export default router;
