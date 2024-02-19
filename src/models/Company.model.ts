import { Company } from "models/entities/Company.entity";
import dataSource from "configs/dataSource";
import { BaseModel } from "./Base.model";
import { type TCompany } from "./types/company.types";

export class CompanyModel extends BaseModel<Company> {
  _repository = dataSource.getRepository(Company);

  async save(payload: TCompany) {
    return await this._repository.save(payload);
  }
}
