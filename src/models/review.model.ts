import { DataTypes, Model, type Optional } from "sequelize";
import sequelize from "../config/database";

interface ReviewAttributes {
  id: number;
  userId: number;
  productId: number;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type ReviewCreationAttributes = Optional<ReviewAttributes, "id">;

class Review extends Model<ReviewAttributes, ReviewCreationAttributes> implements ReviewAttributes {
  declare id: number;
  declare userId: number;
  declare productId: number;
  declare rating: number;
  declare comment: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Review.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    productId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    rating: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false },
    comment: { type: DataTypes.TEXT, allowNull: false },
  },
  { sequelize, tableName: "reviews" }
);

export default Review;
