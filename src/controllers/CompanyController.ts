import CompanyModel from "models/CompanyModel";
import { Request, Response } from "express";

class CompanyController {
  static getOne = (request: Request, response: Response) => {
    const id = Number(request.params.id);

    response.json(CompanyModel.findOne(id));
  };

  static getAll = (request: Request, response: Response) => {
    response.json(CompanyModel.findAll());
  };

  static post = (request: Request, response: Response) => {
    const name = request.body.name;

    response.json(CompanyModel.insert(name));
  };

  static put = (request: Request, response: Response) => {
    const id = Number(request.params.id);
    const name = request.body.name;

    response.json(CompanyModel.update(id, name));
  };

  static delete = (request: Request, response: Response) => {
    const id = Number(request.params.id);

    response.json(CompanyModel.remove(id));
  };
}

export default CompanyController;
