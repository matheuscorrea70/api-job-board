import { Company } from "models/entities/Company.entity";
import dataSource from "configs/dataSource";
import { BaseModel } from "./Base.model";

class CompanyModel extends BaseModel<Company> {
  repository = dataSource.getRepository(Company);
}

export default CompanyModel;
