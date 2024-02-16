import { Job } from "models/entities/Job.entity";
import dataSource from "configs/dataSource";
import { CompanyModel } from "./Company.model";
import { SaveJobPayload } from "./types/job.types";
import { BaseModel } from "./Base.model";
import { Company } from "./entities/Company.entity";

export class JobModel extends BaseModel<Job> {
  _repository = dataSource.getRepository(Job);

  save = async (data: SaveJobPayload) => {
    const companyModel = new CompanyModel();

    let companyToSave = { id: data.company.id };
    let companyEntity: Company | undefined;

    if (!data.company.id) {
      companyEntity = await companyModel.findOneBy({ name: data.company.name });

      if (!companyEntity) {
        companyEntity = await companyModel.save({
          name: data.company.name,
        });
      }

      companyToSave = { id: companyEntity.id };
    }

    return this._repository.save({ ...data, company: companyToSave });
  };
}

