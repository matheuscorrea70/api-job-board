import { Company } from "entities/Company";
import dataSource from "configs/dataSource";

class CompanyModel {
  static insert = (name: string) => {
    const company = new Company();

    company.name = name;

    return dataSource.manager.save(company);
  };

  static update = async (id: number, name: string) => {
    const company = new Company();

    company.id = id;
    company.name = name;

    return dataSource.manager.save(company);
  };

  static findOne = async (id: number) => {
    return dataSource.manager.findOneBy(Company, {
      id,
    });
  };

  static findAll = async () => {
    return dataSource.manager.find(Company);
  };

  static remove = async (id: number) => {
    const company = await CompanyModel.findOne(id);

    return dataSource.manager.remove(company);
  };
}

export default CompanyModel;
