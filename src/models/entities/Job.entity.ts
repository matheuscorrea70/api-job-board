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

  @Column({ default: "" })
  title: string = "";

  @Column("text")
  description: string = "";

  @Column({ default: "" })
  url: string = "";

  @Column({
    type: "enum",
    enum: JobType,
    default: JobType.FullTime,
  })
  type: JobType = JobType.FullTime;

  @Column({
    type: "enum",
    enum: JobLocationType,
    default: JobLocationType.Remote,
  })
  locationType: JobLocationType = JobLocationType.Remote;

  @Column({
    type: "enum",
    enum: JobLevel,
    default: JobLevel.MidSenior,
  })
  level: JobLevel = JobLevel.MidSenior;

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
