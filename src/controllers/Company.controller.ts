import { CompanyModel } from "models/Company.model";
import { Request, Response } from "express";
import { BaseController } from "./Base.controller";
import { getPaginationParams } from "utils/params/getPaginationParams";
import {
  CompanySize,
  TCompany,
  SearchCompanyPayload,
} from "models/types/company.types";

export class CompanyController extends BaseController<CompanyModel> {
  model = new CompanyModel();

  getSearchParams = (request: Request): SearchCompanyPayload => {
    const query = request.query || {}

    return {
      ...(query.name && { name: (query.name as string) }),
      ...(query.size && { size: (query.size as CompanySize) }),
    };
  };

  getBodyCompany = (request: Request): TCompany => {
    const body = request.body || {}

    return {
      name: body.name || "",
      size: body.size || null,
    };
  };

  getOne = async (request: Request, response: Response) => {
    if (!this.validateRequest(request, response)) {
      return;
    }

    const id = this.getParamId(request);
    const company = await this.model.findOneBy({ id });

    response.json(company);
  };

  getAll = async (request: Request, response: Response) => {
    if (!this.validateRequest(request, response)) {
      return;
    }

    const where = this.getSearchParams(request);
    const { page, limit } = getPaginationParams(request);

    const companies = await this.model.findWithPagination(page, limit, {
      where,
    });

    response.json(companies);
  };

  post = async (request: Request, response: Response) => {
    if (!this.validateRequest(request, response)) {
      return;
    }

    const payload = this.getBodyCompany(request);
    const company = await this.model.save(payload);

    response.json(company);
  };

  put = async (request: Request, response: Response) => {
    if (!this.validateRequest(request, response)) {
      return;
    }

    const id = this.getParamId(request);
    const payload = this.getBodyCompany(request);
    const company = await this.model.save({ ...payload, id });

    response.json(company);
  };

  delete = async (request: Request, response: Response) => {
    if (!this.validateRequest(request, response)) {
      return;
    }

    const id = this.getParamId(request);
    const company = await this.model.findOneBy({ id });

    if (company) {
      await this.model.softRemove(company);
    }

    response.json();
  };
}
