import CompanyModel from "models/CompanyModel";
import { Request, Response } from "express";

class CompanyController {
  static getOne = async (request: Request, response: Response) => {
    const id = Number(request.params.id);
    const company = await CompanyModel.repository.findOneBy({ id });

    response.json(company);
  };

  static getAll = async (request: Request, response: Response) => {
    const companies = await CompanyModel.repository.find();

    response.json(companies);
  };

  static post = async (request: Request, response: Response) => {
    const name = request.body.name;
    const company = await CompanyModel.repository.save({ name });

    response.json(company);
  };

  static put = async (request: Request, response: Response) => {
    const id = Number(request.params.id);
    const name = request.body.name;
    const company = await CompanyModel.repository.save({ id, name });

    response.json(company);
  };

  static delete = async (request: Request, response: Response) => {
    const id = Number(request.params.id);
    const company = await CompanyModel.repository.findOneBy({ id });

    await CompanyModel.repository.remove(company);

    response.json();
  };
}

export default CompanyController;
