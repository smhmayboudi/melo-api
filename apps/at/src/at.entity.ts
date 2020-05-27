import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "ats", orderBy: { id: "ASC" } })
export class AtEntity {
  constructor(
    count: number,
    created_at: Date,
    expire_at: Date,
    id: number,
    user_id: number,
    token: string
  ) {
    this.count = count;
    this.created_at = created_at;
    this.expire_at = expire_at;
    this.id = id;
    this.user_id = user_id;
    this.token = token;
  }

  @Column({ type: "tinyint" })
  count: number;

  @Column({ type: "datetime" })
  created_at: Date;

  @Column({ type: "datetime" })
  expire_at: Date;

  @PrimaryGeneratedColumn("increment", { type: "int" })
  id: number;

  @Column({ type: "int" })
  user_id: number;

  @Column({ length: 512, type: "varchar" })
  token: string;
}
