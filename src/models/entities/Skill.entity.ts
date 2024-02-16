import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./Job.entity";

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 100 })
  name?: string = "";
}
