import { BaseController } from "./Base.controller";
import { ProvinceModel } from "models/Province.model";
import { ActionFunc } from "src/types/request.type";

export class ProvinceController extends BaseController<ProvinceModel> {
  model = new ProvinceModel();

  getAll: ActionFunc = async (request, response) => {    
    const countryId = request.params.countryId as string
    const provinces = await this.model.findByCountry(countryId);

    response.json(provinces);
  };
}
