import { CountryModel } from "models/Country.model";
import { BaseController } from "./Base.controller";
import { type ActionFunc } from "src/types/request.type";
import { handleError } from "utils/errors/handleError";

export class CountryController extends BaseController<CountryModel> {
  model = new CountryModel();

  getAll: ActionFunc = async (_, response) => {
    try {
      const countries = await this.model.find();

      response.json(countries);
    } catch (error) {
      handleError(error, response);
    }
  };
}
