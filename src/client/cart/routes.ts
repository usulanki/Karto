import { Router } from "express";
import * as controller from "./controller";

const router = Router();

router.get("/", controller.getCart);
router.post("/", controller.addToCart);
router.delete("/:productId", controller.removeFromCart);

export default router;
