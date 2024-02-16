import { Router } from "express";
import CompanyController from "controllers/CompanyController";

const controller = new CompanyController()
const router = Router();

router.get("/", controller.getAll);
router.delete("/:id", controller.delete);
router.get("/:id", controller.getOne);
router.put("/:id", controller.put);
router.post("/", controller.post);

export default router;
