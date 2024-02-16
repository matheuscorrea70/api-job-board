import CompanyModel from "models/Company.model";
import { Request, Response } from "express";
import { BaseController } from "./Base.controller";

class CompanyController extends BaseController<CompanyModel> {
  model = new CompanyModel()
  
  getOne = async (request: Request, response: Response) => {
    const id = Number(request.params.id);
    const company = await this.model.repository.findOneBy({ id });

    response.json(company);
  };

  getAll = async (request: Request, response: Response) => {
    const companies = await this.model.repository.find();

    response.json(companies);
  };

  post = async (request: Request, response: Response) => {
    const name = request.body.name;
    const company = await this.model.repository.save({ name });

    response.json(company);
  };

  put = async (request: Request, response: Response) => {
    const id = Number(request.params.id);
    const name = request.body.name;
    const company = await this.model.repository.save({ id, name });

    response.json(company);
  };

  delete = async (request: Request, response: Response) => {
    const id = Number(request.params.id);
    const company = await this.model.repository.findOneBy({ id });

    await this.model.repository.remove(company);

    response.json();
  };
}

export default CompanyController;
