import { Router } from "express";

import { ProvinceController } from "controllers/ProvinceController";

const controller = new ProvinceController();
const router = Router();

router.get("/:countryId", controller.getAll);

export default router;
