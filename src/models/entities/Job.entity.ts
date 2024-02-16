import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./Company.entity";

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column("text")
  description: string;

  @Column()
  url: string;

  @ManyToOne(() => Company, (company) => company.name)
  company: Company
}
