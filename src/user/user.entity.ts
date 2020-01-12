import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "./type/Gender";

@Entity({ name: "users", orderBy: { id: "ASC" } })
export class User {
  constructor(
    id: number,
    username: string,
    cellphone: string,
    telegram_id: number,
    language_code: string,
    registered_date: Date,
    email: string,
    firstname: string,
    lastname: string,
    gender: Gender,
    birthday: Date,
    biography: string,
    avatar: string
  ) {
    this.id = id;
    this.username = username;
    this.cellphone = cellphone;
    this.telegram_id = telegram_id;
    this.language_code = language_code;
    this.registered_date = registered_date;
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.gender = gender;
    this.birthday = birthday;
    this.biography = biography;
    this.avatar = avatar;
  }

  @Column({ type: "int", length: 11 })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 30 })
  username: string;

  @Column({ type: "char", length: 100 })
  cellphone: string;

  @Column({ type: "bigint" })
  telegram_id: number;

  @Column({ type: "varchar", length: 20 })
  language_code: string;

  @Column({ type: "datetime" })
  registered_date: Date;

  @Column({ type: "varchar", length: 200 })
  email: string;

  @Column({ type: "varchar", length: 100 })
  firstname: string;

  @Column({ type: "varchar", length: 100 })
  lastname: string;

  @Column({ type: "enum", nullable: true })
  gender: Gender | null;

  @Column({ type: "date", nullable: true, default: null })
  birthday: Date | null;

  @Column({ type: "text", nullable: true, default: null })
  biography: string | null;

  @Column({ type: "varchar", length: 100, nullable: true, default: null })
  avatar: string | null;
}
