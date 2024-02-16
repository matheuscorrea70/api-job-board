import { Country } from "models/entities/Country.entity";
import dataSource from "configs/dataSource";
import { BaseModel } from "./Base.model";

export class CountryModel extends BaseModel<Country> {
  _repository = dataSource.getRepository(Country);
}
