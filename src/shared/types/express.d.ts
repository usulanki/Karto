import "express";

declare module "express" {
  interface Request {
    user?: {
      id: string;
      role: "admin" | "customer";
    };
    admin?: {
      id: number;
      username: string;
      email: string;
      role_id: number;
    };
  }
}
