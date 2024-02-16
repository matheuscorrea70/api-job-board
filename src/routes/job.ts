import { Router } from "express";
import JobController from "controllers/JobController";

const controller = new JobController()
const router = Router();

router.get("/", controller.getAll);
// router.delete("/:id", controller.delete);
// router.get("/:id", controller.getOne);
// router.put("/:id", controller.put);
router.post("/", controller.post);

export default router;
