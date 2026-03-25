import { DataTypes, Model, type Optional } from "sequelize";
import sequelize from "../config/database";

interface ReviewAttributes {
  id: number;
  user_id: number;
  product_id: number;
  rating: number;
  comment: string;
  created_ts?: Date;
  updated_ts?: Date;
}

type ReviewCreationAttributes = Optional<ReviewAttributes, "id">;

class Review extends Model<ReviewAttributes, ReviewCreationAttributes> implements ReviewAttributes {
  declare id: number;
  declare user_id: number;
  declare product_id: number;
  declare rating: number;
  declare comment: string;
  declare created_ts: Date;
  declare updated_ts: Date;
}

Review.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    product_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    rating: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false },
    comment: { type: DataTypes.TEXT, allowNull: false },
  },
  { sequelize, tableName: "reviews", createdAt: "created_ts", updatedAt: "updated_ts" }
);

export default Review;
