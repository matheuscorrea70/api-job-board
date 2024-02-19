import { JobModel } from "models/Job.model";
import { type Request } from "express";
import { BaseController } from "./Base.controller";
import type {
  SearchJobPayload,
  JobLevel,
  JobLocationType,
  JobType,
  TJob,
} from "models/types/job.types";
import { getPaginationParams } from "utils/params/getPaginationParams";
import { Like } from "typeorm";
import { type ActionFunc } from "src/types/request.type";
import { handleError } from "utils/errors/handleError";

export class JobController extends BaseController<JobModel> {
  model = new JobModel();

  getSearchParams = (request: Request): SearchJobPayload => {
    const query = request.query || {};

    return {
      ...(query.title && { title: Like(`%${query.title as string}%`) }),
      ...(query.description && {
        description: Like(`%${query.description as string}%`),
      }),
      ...(query.type && { type: query.type as JobType }),
      ...(query.locationType && {
        locationType: query.locationType as JobLocationType,
      }),
      ...(query.level && { level: query.level as JobLevel }),
      ...(query.company && {
        company: query.company as {
          id?: number;
          name?: string;
        },
      }),
      ...(query.country && {
        country: query.country as {
          id: string;
        },
      }),
    };
  };

  getBodyJob = (request: Request): TJob => {
    const body = request.body || {};

    const title = body.title as string;
    const description = body.description as string;
    const url = body.url as string;
    const companyId = body?.company?.id as number;
    const companyName = body?.company?.name as string;
    const countryId = body?.country?.id as string;
    const provinceId = body?.province?.id as number;
    const type = body.type as JobType;
    const locationType = body.locationType as JobLocationType;
    const level = body.level as JobLevel;
    const skills = body.skills as string[];

    return {
      title,
      description,
      url,
      type,
      locationType,
      level,
      skills,
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

  getOne: ActionFunc = async (request, response) => {
    try {
      if (!this.validateRequest(request, response)) {
        return;
      }

      const id = this.getParamId(request);
      const job = await this.model.findOne({ where: { id } });

      response.json(job);
    } catch (error) {
      handleError(error, response);
    }
  };

  post: ActionFunc = async (request, response) => {
    try {
      if (!this.validateRequest(request, response)) {
        return;
      }

      const payload = this.getBodyJob(request);
      const job = await this.model.save(payload);

      response.json(job);
    } catch (error) {
      handleError(error, response);
    }
  };

  put: ActionFunc = async (request, response) => {
    try {
      if (!this.validateRequest(request, response)) {
        return;
      }

      const id = this.getParamId(request);
      const payload = this.getBodyJob(request);
      const job = await this.model.save({ ...payload, id });

      response.json(job);
    } catch (error) {
      handleError(error, response);
    }
  };

  getAll: ActionFunc = async (request, response) => {
    try {
      if (!this.validateRequest(request, response)) {
        return;
      }

      const { page, limit } = getPaginationParams(request);
      const where = this.getSearchParams(request);

      const jobList = await this.model.findWithPagination(page, limit, {
        where,
      });

      response.json(jobList);
    } catch (error) {
      handleError(error, response);
    }
  };

  delete: ActionFunc = async (request, response) => {
    try {
      if (!this.validateRequest(request, response)) {
        return;
      }

      const id = this.getParamId(request);
      const job = await this.model.findOneBy({ id });

      if (job) {
        await this.model.softRemove(job);
      }

      response.json();
    } catch (error) {
      handleError(error, response);
    }
  };
}
