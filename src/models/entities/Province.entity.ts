import { Column, Entity, Index, PrimaryColumn } from "typeorm";

@Entity()
export class Province {
  @PrimaryColumn()
  id?: number;

  @Column({ length: 60 })
  name?: string;

  @Index()
  @Column({ length: 2 })
  countryId?: string;
}
