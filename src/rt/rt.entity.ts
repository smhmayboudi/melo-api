import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Rt } from "./type/rt";

@Entity({ name: "rts", orderBy: { id: "ASC" } })
export class RtEntity implements Rt {
  constructor(
    create_at: Date,
    description: string,
    expire_at: Date,
    id: number,
    is_blocked: boolean,
    user_id: number,
    token: string
  ) {
    this.create_at = create_at;
    this.description = description;
    this.expire_at = expire_at;
    this.id = id;
    this.is_blocked = is_blocked;
    this.user_id = user_id;
    this.token = token;
  }

  @Column({ type: "datetime" })
  create_at: Date;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "datetime" })
  expire_at: Date;

  @PrimaryGeneratedColumn("increment", { type: "int" })
  id: number;

  @Column({ type: "boolean" })
  is_blocked: boolean;

  @Column({ type: "int" })
  user_id: number;

  @Column({ length: 256, nullable: false, type: "varchar" })
  token: string;
}