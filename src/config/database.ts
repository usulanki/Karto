import { Sequelize } from "sequelize";
import { env } from "./env";

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
  host: env.DB_HOST,
  port: env.DB_PORT,
  dialect: "mysql",
  logging: env.NODE_ENV === "development" ? console.log : false,
});

export default sequelize;
