import { Company } from "models/entities/Company";
import dataSource from "configs/dataSource";
import { BaseModel } from "./BaseModel";

class CompanyModel extends BaseModel<Company> {
  repository = dataSource.getRepository(Company);
}

export default CompanyModel;
