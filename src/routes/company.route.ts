import { Router } from "express";
import { CompanyController } from "controllers/Company.controller";
import { paramIdValidator } from "utils/validators/paramId.validator";
import { bodyCompanyValidator } from "utils/validators/company.validator";

const controller = new CompanyController();
const router = Router();

router.get("/", controller.getAll);
router.delete("/:id", paramIdValidator(), controller.delete);
router.get("/:id", paramIdValidator(), controller.getOne);
router.put("/:id", paramIdValidator(), bodyCompanyValidator(), controller.put);
router.post("/", bodyCompanyValidator(), controller.post);

export default router;
