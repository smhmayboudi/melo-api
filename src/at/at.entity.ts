import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { At } from "./type/at";

@Entity({ name: "ats", orderBy: { id: "ASC" } })
export class AtEntity implements At {
  constructor(
    create_at: Date,
    expire_at: Date,
    id: number,
    user_id: number,
    token: string
  ) {
    this.create_at = create_at;
    this.expire_at = expire_at;
    this.id = id;
    this.user_id = user_id;
    this.token = token;
  }

  @Column({ type: "datetime" })
  create_at: Date;

  @Column({ type: "datetime" })
  expire_at: Date;

  @PrimaryGeneratedColumn("increment", { type: "int" })
  id: number;

  @Column({ type: "int" })
  user_id: number;

  @Column({ length: 512, nullable: false, type: "varchar" })
  token: string;
}
