import { Province } from "models/entities/Province.entity";
import dataSource from "configs/dataSource";
import { BaseModel } from "./Base.model";

export class ProvinceModel extends BaseModel<Province> {
  _repository = dataSource.getRepository(Province);

  async findByCountry(countryId: string) {
    return await this._repository.findBy({ countryId });
  }
}
