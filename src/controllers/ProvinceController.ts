import { BaseController } from "./Base.controller";
import { ProvinceModel } from "models/Province.model";
import { type ActionFunc } from "src/types/request.type";
import { handleError } from "utils/errors/handleError";

export class ProvinceController extends BaseController<ProvinceModel> {
  model = new ProvinceModel();

  getAll: ActionFunc = async (request, response) => {    
    try {
      const countryId = request.params.countryId
      const provinces = await this.model.findByCountry(countryId);
  
      response.json(provinces);
    } catch (error) {
      handleError(error, response)
    }
  };
}
