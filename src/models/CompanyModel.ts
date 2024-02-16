import { CompanyEntity } from "entities/CompanyEntity";

class CompanyModel {
  static insert = (name: string) => {
    const company = new CompanyEntity();

    company.name = name;

    return company.save();
  };

  static update = async (id: number, name: string) => {
    const company = new CompanyEntity();

    company.id = id;
    company.name = name;

    return company.save();
  };

  static findOne = async (id: number) => {
    return CompanyEntity.findOneBy({
      id,
    });
  };

  static findAll = async () => {
    return CompanyEntity.find();
  };

  static remove = async (id: number) => {
    const company = await CompanyModel.findOne(id);

    return company.remove();
  };
}

export default CompanyModel;
