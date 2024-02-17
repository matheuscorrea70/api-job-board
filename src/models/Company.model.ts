import { Company } from "models/entities/Company.entity";
import dataSource from "configs/dataSource";
import { BaseModel } from "./Base.model";
import { TCompany } from "./types/company.types";

export class CompanyModel extends BaseModel<Company> {
  _repository = dataSource.getRepository(Company);

  save(payload: TCompany) {
    return this._repository.save(payload);
  }
}
