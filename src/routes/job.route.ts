import { Router } from "express";
import { JobController } from "controllers/Job.controller";
import { queryPaginationValidator } from "utils/validators/queryPagination.validator";
import { bodyJobValidator } from "utils/validators/job.validator";
import { paramIdValidator } from "utils/validators/paramId.validator";

const controller = new JobController();
const router = Router();

router.get("/", queryPaginationValidator(), controller.getAll);
router.delete("/:id", paramIdValidator(), controller.delete);
router.get("/:id", paramIdValidator(), controller.getOne);
router.put("/:id", paramIdValidator(), bodyJobValidator(), controller.put);
router.post("/", bodyJobValidator(), controller.post);

export default router;
