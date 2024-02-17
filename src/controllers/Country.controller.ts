import { CountryModel } from "models/Country.model";
import { BaseController } from "./Base.controller";
import { ActionFunc } from "src/types/request.type";

export class CountryController extends BaseController<CountryModel> {
  model = new CountryModel();

  getAll: ActionFunc = async (_, response) => {
    const countries = await this.model.find();

    response.json(countries);
  };
}
