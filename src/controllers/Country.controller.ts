import { CountryModel } from "models/Country.model";
import { BaseController } from "./Base.controller";
import { Request, Response } from "express";

export class CountryController extends BaseController<CountryModel> {
  model = new CountryModel();

  getAll = async (request: Request, response: Response) => {
    const countries = await this.model.find();

    response.json(countries);
  };
}
