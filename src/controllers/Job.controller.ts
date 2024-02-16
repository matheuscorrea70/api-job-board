import JobModel from "models/Job.model";
import { Request, Response } from "express";
import { BaseController } from "./Base.controller";
import { validationResult } from "express-validator";

class JobController extends BaseController<JobModel> {
  model = new JobModel();

  post = async (request: Request, response: Response) => {
    const title = request.body.title;
    const description = request.body.description;
    const url = request.body.url;
    const company = request.body.company;

    const job = await this.model.save({
      title,
      description,
      url,
      company,
    });

    response.json(job);
  };

  getAll = async (request: Request, response: Response) => {
    if (!this.validateRequest(request, response)) {
      return
    }

    const page = Number(request.query.page || 1);
    const limit = Number(request.query.limit || 10);
    const jobList = await this.model.findWithPagination(page, limit);

    response.json(jobList);
  };
}

export default JobController;
