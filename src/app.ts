import 'dotenv/config'

import express from "express";
import bodyParser from "body-parser";
import dataSource from "./configs/dataSource";
import CompanyController from "./controllers/CompanyController";

const app = express();

dataSource.initialize();

app.set("port", process.env.PORT || 3051);

app.use(bodyParser.json());

app.get("/company", CompanyController.getAll);
app.delete("/company/:id", CompanyController.delete);
app.get("/company/:id", CompanyController.getOne);
app.put("/company/:id", CompanyController.put);
app.post("/company", CompanyController.post);

export default app;
