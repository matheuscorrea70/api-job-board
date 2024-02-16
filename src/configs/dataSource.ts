import "reflect-metadata";
import { DataSource } from "typeorm";
import entities from "entities/index";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 5432,
  username: "root",
  password: "#Root@123456#",
  synchronize: true,
  logging: true,
  entities: entities,
  migrations: [],
  subscribers: [],
});

export default AppDataSource
