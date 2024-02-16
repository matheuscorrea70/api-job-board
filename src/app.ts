import express from "express";
import dataSource from "configs/dataSource";
import CompanyController from "controllers/CompanyController";

const app = express();

dataSource.initialize();

app.set("port", 3000);

app.get("/company", CompanyController.getAll);
app.delete("/company/:id", CompanyController.delete);
app.get("/company/:id", CompanyController.getOne);
app.put("/company/:id", CompanyController.put);
app.post("/company", CompanyController.post);

export default app;
