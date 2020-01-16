import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Token } from "./type/token";

@Entity({ name: "tokens", orderBy: { id: "ASC" } })
export class TokenEntity implements Token {
  constructor(
    create_session_date: Date,
    description: string,
    expiration_date: Date,
    id: number,
    is_blocked: boolean,
    last_request_date: Date,
    user_id: number,
    token: string
  ) {
    this.create_session_date = create_session_date;
    this.description = description;
    this.expiration_date = expiration_date;
    this.id = id;
    this.is_blocked = is_blocked;
    this.last_request_date = last_request_date;
    this.user_id = user_id;
    this.token = token;
  }

  @Column({ type: "datetime" })
  create_session_date: Date;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "datetime" })
  expiration_date: Date;

  @Column({ type: "int" })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "boolean" })
  is_blocked: boolean;

  @Column({ type: "datetime" })
  last_request_date: Date;

  @Column({ type: "int" })
  user_id: number;

  @Column({ length: 255, nullable: false, type: "char" })
  token: string;
}
