import { Router } from "express";
import * as controller from "./controller";

const router = Router();

router.get("/", controller.getOrders);
router.post("/", controller.createOrder);
router.get("/:id", controller.getOrderById);

export default router;
