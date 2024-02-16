import { Company } from "models/entities/Company.entity";
import dataSource from "configs/dataSource";
import { BaseModel } from "./Base.model";
import { SaveCompanyPayload } from "./types/company.types";

export class CompanyModel extends BaseModel<Company> {
  _repository = dataSource.getRepository(Company);

  save(payload: SaveCompanyPayload) {
    return this._repository.save(payload);
  }
}
