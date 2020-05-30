import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "cache" })
export class DataCacheEntity {
  constructor(id: number, date: Date, name: string, result: string) {
    this.id = id;
    this.date = date;
    this.name = name;
    this.result = result;
  }

  @PrimaryGeneratedColumn("increment", { type: "int" })
  id: number;

  @Column({ type: "date" })
  date: Date;

  @Column({ length: 100, type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  result: string;
}
