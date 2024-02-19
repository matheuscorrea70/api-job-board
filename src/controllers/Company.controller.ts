import { CompanyModel } from "models/Company.model";
import { type Request } from "express";
import { BaseController } from "./Base.controller";
import { getPaginationParams } from "utils/params/getPaginationParams";
import {
  type CompanySize,
  type TCompany,
  type SearchCompanyPayload,
} from "models/types/company.types";
import { type ActionFunc } from "src/types/request.type";
import { handleError } from "utils/errors/handleError";

export class CompanyController extends BaseController<CompanyModel> {
  model = new CompanyModel();

  getSearchParams = (request: Request): SearchCompanyPayload => {
    const query = request.query || {};

    return {
      ...(query.name && { name: query.name as string }),
      ...(query.size && { size: query.size as CompanySize }),
    };
  };

  getBodyCompany = (request: Request): TCompany => {
    const body = request.body || {};

    return {
      name: body.name || "",
      size: body.size || null,
    };
  };

  getOne: ActionFunc = async (request, response) => {
    try {
      if (!this.validateRequest(request, response)) {
        return;
      }

      const id = this.getParamId(request);
      const company = await this.model.findOneBy({ id });

      response.json(company);
    } catch (error) {
      handleError(error, response);
    }
  };

  getAll: ActionFunc = async (request, response) => {
    try {
      if (!this.validateRequest(request, response)) {
        return;
      }

      const where = this.getSearchParams(request);
      const { page, limit } = getPaginationParams(request);

      const companies = await this.model.findWithPagination(page, limit, {
        where,
      });

      response.json(companies);
    } catch (error) {
      handleError(error, response);
    }
  };

  post: ActionFunc = async (request, response) => {
    try {
      if (!this.validateRequest(request, response)) {
        return;
      }

      const payload = this.getBodyCompany(request);
      const company = await this.model.save(payload);

      response.json(company);
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
      const payload = this.getBodyCompany(request);
      const company = await this.model.save({ ...payload, id });

      response.json(company);
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
      const company = await this.model.findOneBy({ id });

      if (company) {
        await this.model.softRemove(company);
      }

      response.json();
    } catch (error) {
      handleError(error, response);
    }
  };
}
