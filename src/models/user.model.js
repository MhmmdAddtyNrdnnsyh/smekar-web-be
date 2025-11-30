import db from "../config/db.config.js";
import { DataTypes } from "sequelize";

const Users = db.define(
  "users",
  {
    name: DataTypes.STRING,
    gender: DataTypes.ENUM("male", "fermale"),
    address: DataTypes.TEXT,
    email: DataTypes.STRING,
    phone_number: DataTypes.INTEGER,
    fotoUrl: DataTypes.STRING,
    fotoName: DataTypes.STRING
  },
  {
    freezeTableName: true,
  }
);

export default Users;
