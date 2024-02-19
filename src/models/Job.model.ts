import { Job } from "models/entities/Job.entity";
import dataSource from "configs/dataSource";
import { CompanyModel } from "./Company.model";
import { type TJob } from "./types/job.types";
import { BaseModel } from "./Base.model";
import { type Skill } from "./entities/Skill.entity";
import { SkillModel } from "./Skill.model";
import { type FindOneOptions } from "typeorm";

export class JobModel extends BaseModel<Job> {
  _repository = dataSource.getRepository(Job);

  private async _saveSkills(skills: string[]): Promise<Skill[]> {
    const skillModel = new SkillModel();
    const skillsToSave: string[] = [];
    const loadedSkills: Skill[] = [];

    for (const skillName of skills) {
      const skillObj = await skillModel.findOneBy({ name: skillName });

      if (skillObj) {
        loadedSkills.push(skillObj);
      } else {
        skillsToSave.push(skillName);
      }
    }

    const savedSkills = await skillModel.save(skillsToSave);

    return [...loadedSkills, ...savedSkills];
  }

  private async _saveCompany(data: TJob) {
    if (data.company.id) {
      return data.company
    }

    const companyModel = new CompanyModel();

    let companyEntity = await companyModel.findOneBy({ name: data.company.name });

    if (!companyEntity && data.company.name) {
      companyEntity = await companyModel.save({
        name: data.company.name,
      });
    }

    return companyEntity || undefined;
  }

  async save(data: TJob) {
    return await dataSource.transaction(async () => {
      const [company, skills] = await Promise.all([
        this._saveCompany(data),
        this._saveSkills(data.skills),
      ]);

      const job = new Job();

      if (data.id) {
        job.id = data.id
      }

      job.title = data.title;
      job.description = data.description;
      job.url = data.url;
      job.type = data.type;
      job.locationType = data.locationType;
      job.level = data.level;
      job.skills = skills;
      job.company = company;
      job.country = data.country;
      job.province = data.province;

      return await this._repository.save(job);
    });
  }

  async findOne(options: FindOneOptions<Job>) {
    return await this._repository.findOne({
      relations: {
        company: true,
        country: true,
        skills: true,
        province: true,
      },
      ...options,
    });
  }
}
