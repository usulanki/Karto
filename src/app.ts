import express from "express";
import cors from "cors";
import { errorMiddleware } from "./shared/middleware/error.middleware";
import { adminMiddleware } from "./shared/middleware/adminMiddleware";

// Admin routes
import adminAuthRouter from "./admin/auth/routes";
import adminAdminsRouter from "./admin/admins/routes";
import adminUsersRouter from "./admin/users/routes";
import adminProductsRouter from "./admin/products/routes";
import adminCategoriesRouter from "./admin/categories/routes";
import adminOrdersRouter from "./admin/orders/routes";
import adminRolesRouter from "./admin/roles/routes";
import adminPermissionsRouter from "./admin/permissions/routes";
import adminTaxRouter from "./admin/tax/routes";
import adminMediaRouter from "./admin/media/routes";
import adminUomRouter from "./admin/uom/routes";

// Client routes
import authRouter from "./client/auth/routes";
import clientUsersRouter from "./client/users/routes";
import clientProductsRouter from "./client/products/routes";
import clientCategoriesRouter from "./client/categories/routes";
import cartRouter from "./client/cart/routes";
import clientOrdersRouter from "./client/orders/routes";
import paymentsRouter from "./client/payments/routes";
import reviewsRouter from "./client/reviews/routes";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.get("/health", (_req, res) => {
  res.json({ success: true, message: "OK" });
});

// Admin API
app.use("/api/admin/auth", adminAuthRouter);
app.use("/api/admin", adminMiddleware);
app.use("/api/admin/admins", adminAdminsRouter);
app.use("/api/admin/users", adminUsersRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/categories", adminCategoriesRouter);
app.use("/api/admin/orders", adminOrdersRouter);
app.use("/api/admin/roles", adminRolesRouter);
app.use("/api/admin/permissions", adminPermissionsRouter);
app.use("/api/admin/tax", adminTaxRouter);
app.use("/api/admin/media", adminMediaRouter);
app.use("/api/admin/uom", adminUomRouter);

// Client API
app.use("/api/auth", authRouter);
app.use("/api/users", clientUsersRouter);
app.use("/api/products", clientProductsRouter);
app.use("/api/categories", clientCategoriesRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", clientOrdersRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/reviews", reviewsRouter);

app.use(errorMiddleware);

export default app;
