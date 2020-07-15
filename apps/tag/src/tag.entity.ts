import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: "tags", orderBy: { id: "ASC" } })
export class TagEntity {
  constructor(id: number, name: string, type_id: number, value?: string) {
    this.id = id;
    this.name = name;
    this.type_id = type_id;
    this.value = value;
  }

  @PrimaryGeneratedColumn("increment", { type: "int" })
  id: number;

  @Column({ length: 512, type: "varchar" })
  name: string;

  @Column({ type: "int" })
  type_id: number;

  @Column({ length: 512, type: "varchar" })
  value?: string;
}
