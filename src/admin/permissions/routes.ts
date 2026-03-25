import { Router } from "express";
import * as controller from "./controller";
import { checkPermission } from "../../shared/middleware/permissionMiddleware";

const router = Router();

router.get("/", checkPermission("/permissions"), controller.getByRole);
router.put("/:id", controller.update);

export default router;
