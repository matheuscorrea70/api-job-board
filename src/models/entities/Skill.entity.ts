import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 100 })
  name?: string = "";
}
