import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CompanyEntity } from "./CompanyEntity";

@Entity()
export class JobEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column("text")
  description: string;

  @Column()
  url: string;

  @OneToMany(() => CompanyEntity, (company) => company.name)
  company: CompanyEntity;
}
