import dataSource from "configs/dataSource";
import { BaseModel } from "./Base.model";
import { Skill } from "./entities/Skill.entity";

export class SkillModel extends BaseModel<Skill> {
  _repository = dataSource.getRepository(Skill);

  async save(names: string[]): Promise<(Skill)[]> {
    const skills = names.map((name) => ({ name }));

    return await this._repository.save(skills);
  }
}
