import { Router } from "express";
import JobController from "controllers/Job.controller";
import { queryPaginationValidator } from "utils/validators/queryPagination.validator";

const controller = new JobController();
const router = Router();

router.get("/", queryPaginationValidator(), controller.getAll);
// router.delete("/:id", paramIdValidator(), controller.delete);
// router.get("/:id", paramIdValidator(), controller.getOne);
// router.put("/:id", paramIdValidator(), controller.put);
router.post("/", controller.post);

export default router;
