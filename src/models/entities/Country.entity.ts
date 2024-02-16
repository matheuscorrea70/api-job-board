import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Country {
  @PrimaryColumn({ length: 2 })
  id: string;

  @Column({ length: 100 })
  name: string;
}
