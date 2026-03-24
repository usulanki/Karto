import { Router } from "express";
import * as controller from "./controller";

const router = Router();

router.get("/", controller.getAllOrders);
router.patch("/:id/status", controller.updateOrderStatus);

export default router;
