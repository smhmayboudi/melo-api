import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "cache" })
export class DataCacheEntity {
  constructor(id: number, name: string, result: string, date: Date) {
    this.id = id;
    this.name = name;
    this.result = result;
    this.date = date;
  }

  @PrimaryGeneratedColumn("increment", { type: "int" })
  id: number;

  @Column({ length: 100, type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  result: string;

  @Column({ type: "date" })
  date: Date;
}
