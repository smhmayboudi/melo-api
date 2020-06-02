import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "cache" })
export class SongCacheEntity {
  constructor(id: number, date: Date, name: string, result: string) {
    this.date = date;
    this.id = id;
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
