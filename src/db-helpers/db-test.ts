import { Sequelize } from "sequelize";
// @ts-ignore fuck off
import * as models from "../models/index";

export const dbTest = async () => {
  const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@172.19.0.1:5433/${DB_NAME}`
  );

  try {
    await sequelize.authenticate();

    // @ts-ignore fuck off
    console.log(await models.Store.findAll());

    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

dbTest();
