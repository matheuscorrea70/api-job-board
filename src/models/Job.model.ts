import { Job } from "models/entities/Job.entity";
import dataSource from "configs/dataSource";
import { CompanyModel } from "./Company.model";
import { SaveJobPayload } from "./types/job.types";
import { BaseModel } from "./Base.model";
import { Company } from "./entities/Company.entity";
import { Skill } from "./entities/Skill.entity";
import { SkillModel } from "./Skill.model";
import { FindOneOptions } from "typeorm";

export class JobModel extends BaseModel<Job> {
  _repository = dataSource.getRepository(Job);

  private async _saveSkills(skills: string[]): Promise<Skill[]> {
    const skillModel = new SkillModel();
    const skillsToSave: string[] = [];
    const loadedSkills: Skill[] = [];

    for (const skillName of skills) {
      let skillObj = await skillModel.findOneBy({ name: skillName });

      if (skillObj) {
        loadedSkills.push(skillObj);
      } else {
        skillsToSave.push(skillName);
      }
    }

    const savedSkills = await skillModel.save(skillsToSave);

    return [...loadedSkills, ...savedSkills];
  }

  private async _saveCompany(data: SaveJobPayload) {
    const companyModel = new CompanyModel();

    let companyToSave = { id: data.company.id };
    let companyEntity: Company | null = null;

    if (!data.company.id) {
      companyEntity = await companyModel.findOneBy({ name: data.company.name });

      if (!companyEntity && data.company.name) {
        companyEntity = await companyModel.save({
          name: data.company.name,
        });
      }

      companyEntity?.id && (companyToSave = { id: companyEntity.id });
    }

    return companyEntity || undefined;
  }

  save(data: SaveJobPayload) {
    return dataSource.transaction(async () => {
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

      return this._repository.save(job);
    });
  }

  findOne(options: FindOneOptions<Job>) {
    return this._repository.findOne({
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
