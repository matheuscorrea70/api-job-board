import { CompanySize } from "models/types/company.types";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ default: '' })
  name: string = '';

  @Column({
    type: "enum",
    enum: CompanySize,
    nullable: true,
    default: null
  })
  size?: CompanySize | null = null;

  @CreateDateColumn()
  createdDate?: string;

  @UpdateDateColumn()
  updatedDate?: string;

  @DeleteDateColumn()
  deletedDate?: string;
}
