import { BaseController } from "./Base.controller";
import { Request, Response } from "express";
import { ProvinceModel } from "models/Province.model";

export class ProvinceController extends BaseController<ProvinceModel> {
  model = new ProvinceModel();

  getAll = async (request: Request, response: Response) => {    
    const countryId = request.params.countryId as string
    const provinces = await this.model.findByCountry(countryId);

    response.json(provinces);
  };
}
