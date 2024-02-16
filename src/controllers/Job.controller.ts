import { JobModel } from "models/Job.model";
import { Request, Response } from "express";
import { BaseController } from "./Base.controller";

export class JobController extends BaseController<JobModel> {
  model = new JobModel();

  getBodyJob = (request: Request) => {
    const title = request.body.title as string;
    const description = request.body.description as string;
    const url = request.body.url as string;
    const companyId = request.body?.company?.id as number;
    const companyName = request.body?.company?.name as string;
    const countryId = request.body?.country?.id as string;
    const provinceId = request.body?.province?.id as number;

    return {
      title,
      description,
      url,
      company: {
        id: companyId,
        name: companyName,
      },
      country: {
        id: countryId,
      },
      ...(provinceId && { province: { id: provinceId } }),
    };
  };

  getOne = async (request: Request, response: Response) => {
    if (!this.validateRequest(request, response)) {
      return;
    }

    const id = this.getParamId(request);
    const job = await this.model.findOneBy({ id });

    response.json(job);
  };

  post = async (request: Request, response: Response) => {
    if (!this.validateRequest(request, response)) {
      return;
    }

    const id = this.getParamId(request);
    const payload = this.getBodyJob(request);

    const job = await this.model.save({ ...payload, id });

    response.json(job);
  };

  put = async (request: Request, response: Response) => {
    if (!this.validateRequest(request, response)) {
      return;
    }

    const payload = this.getBodyJob(request);
    const job = await this.model.save(payload);

    response.json(job);
  };

  getAll = async (request: Request, response: Response) => {
    if (!this.validateRequest(request, response)) {
      return;
    }

    const page = Number(request.query.page || 1);
    const limit = Number(request.query.limit || 10);
    const jobList = await this.model.findWithPagination(page, limit);

    response.json(jobList);
  };

  delete = async (request: Request, response: Response) => {
    if (!this.validateRequest(request, response)) {
      return;
    }

    const id = this.getParamId(request);
    const job = await this.model.findOneBy({ id });

    if (job) {
      await this.model.remove(job);
    }

    response.json();
  };
}
