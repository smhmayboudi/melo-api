import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "rts", orderBy: { id: "ASC" } })
export class RtEntity {
  constructor(
    created_at: Date,
    description: string,
    expire_at: Date,
    id: number,
    is_blocked: boolean,
    user_id: number,
    token: string
  ) {
    this.created_at = created_at;
    this.description = description;
    this.expire_at = expire_at;
    this.id = id;
    this.is_blocked = is_blocked;
    this.user_id = user_id;
    this.token = token;
  }

  @Column({ type: "datetime" })
  created_at: Date;

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

  @Column({ length: 256, type: "varchar" })
  token: string;
}
