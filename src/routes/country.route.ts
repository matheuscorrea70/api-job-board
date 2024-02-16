import { Router } from "express";
import { CountryController } from "controllers/Country.controller";

const controller = new CountryController();
const router = Router();

router.get("/", controller.getAll);

export default router;
