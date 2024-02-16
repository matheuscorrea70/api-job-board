import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Company } from "./Company.entity";
import { Country } from "./Country.entity";
import { Province } from "./Province.entity";
import { JobType, JobLocationType, JobLevel } from "models/types/job.types";
import { Skill } from "./Skill.entity";

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title?: string;

  @Column("text")
  description?: string;

  @Column()
  url?: string;

  @Column({
    type: "enum",
    enum: JobType,
  })
  type?: JobType;

  @Column({
    type: "enum",
    enum: JobLocationType,
  })
  locationType?: JobLocationType;

  @Column({
    type: "enum",
    enum: JobLevel,
  })
  level?: JobLevel;

  @CreateDateColumn()
  createdDate?: string;

  @UpdateDateColumn()
  updatedDate?: string;

  @DeleteDateColumn()
  deletedDate?: string;

  @ManyToMany(() => Skill)
  @JoinTable()
  skills?: Skill[];

  @ManyToOne(() => Company, (company) => company.name, { nullable: false })
  company?: Company;

  @ManyToOne(() => Country, (country) => country.name, { nullable: false })
  country?: Country;

  @ManyToOne(() => Province, (province) => province.name, { nullable: true })
  province?: Province;
}
