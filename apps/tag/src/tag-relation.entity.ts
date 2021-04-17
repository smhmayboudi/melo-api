import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tag_relations", orderBy: { id: "ASC" } })
export class TagRelationEntity {
  constructor(
    category_id: number,
    category: string,
    id: number,
    tag_id: number
  ) {
    this.category_id = category_id;
    this.category = category;
    this.id = id;
    this.tag_id = tag_id;
  }

  @Column({ type: "int" })
  category_id: number;

  @Column({ length: 512, type: "varchar" })
  category: string;

  @PrimaryGeneratedColumn("increment", { type: "int" })
  id: number;

  @Column({ type: "int" })
  tag_id: number;
}
