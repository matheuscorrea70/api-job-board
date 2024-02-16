import { Company } from "models/entities/Company";
import dataSource from "configs/dataSource";

class CompanyModel {
  static repository = dataSource.getRepository(Company);
}

export default CompanyModel;
