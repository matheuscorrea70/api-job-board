import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./Company.entity";
import { Country } from "./Country.entity";
import { Province } from "./Province.entity";

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string = "";

  @Column("text")
  description: string = "";

  @Column()
  url: string = "";

  @ManyToOne(() => Company, (company) => company.name, { nullable: false })
  company: Company | null = null;

  @ManyToOne(() => Country, (country) => country.name, { nullable: false })
  country: Country | null = null;

  @ManyToOne(() => Province, (province) => province.name, { nullable: true })
  province: Province | null = null;
}
