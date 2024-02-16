import dataSource from "configs/dataSource";
import { BaseModel } from "./Base.model";
import { Skill } from "./entities/Skill.entity";

export class SkillModel extends BaseModel<Skill> {
  _repository = dataSource.getRepository(Skill);

  save(names: string[]) {
    const skills = names.map((name) => ({ name }));

    return this._repository.save(skills);
  }
}
