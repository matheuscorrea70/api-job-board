import { Job } from "models/entities/Job";
import dataSource from "configs/dataSource";
import CompanyModel from "./CompanyModel";
import { SaveJobPayload } from "./types/job";
import { BaseModel } from "./BaseModel";

class JobModel extends BaseModel<Job> {
  repository = dataSource.getRepository(Job);

  save = async (data: SaveJobPayload) => {
    const companyModel = new CompanyModel();

    let company = data.company;

    if (!company.id) {
      company = await companyModel.repository.findOneBy({ name: company.name });

      if (!company) {
        company = await companyModel.repository.save({
          ...company,
          id: undefined,
        });
      }
    }

    return this.repository.save(data);
  };
}

export default JobModel;
