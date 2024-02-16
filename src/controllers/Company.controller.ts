import { CompanyModel } from "models/Company.model";
import { Request, Response } from "express";
import { BaseController } from "./Base.controller";
import { getPaginationParams } from "utils/params/getPaginationParams";

export class CompanyController extends BaseController<CompanyModel> {
  model = new CompanyModel();

  getBodyCompany = (request: Request) => {
    const name = request.body.name as string;

    return { name };
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

    const { page, limit } = getPaginationParams(request);

    const companies = await this.model.findWithPagination(page, limit);

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
      await this.model.remove(company);
    }

    response.json();
  };
}
