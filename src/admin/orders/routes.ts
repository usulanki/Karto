import { Router } from "express";
import * as controller from "./controller";
import { checkPermission } from "../../shared/middleware/permissionMiddleware";

const router = Router();

router.get("/", checkPermission("/orders"), controller.list);
router.post("/", checkPermission("/orders"), controller.create);
router.delete("/:id", checkPermission("/orders"), controller.remove);
router.patch("/:id/status", checkPermission("/orders"), controller.changeStatus);

export default router;
