import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "./type/Gender";
import { User } from "./type/User";

@Entity({ name: "users", orderBy: { id: "ASC" } })
export class UserEntity implements User {
  constructor(
    avatar: string | null,
    biography: string | null,
    birthday: Date | null,
    cellphone: string,
    email: string,
    firstname: string,
    gender: Gender | null,
    id: number,
    language_code: string,
    lastname: string,
    registered_date: Date,
    telegram_id: number,
    username: string
  ) {
    this.avatar = avatar;
    this.biography = biography;
    this.birthday = birthday;
    this.cellphone = cellphone;
    this.email = email;
    this.firstname = firstname;
    this.gender = gender;
    this.id = id;
    this.language_code = language_code;
    this.lastname = lastname;
    this.registered_date = registered_date;
    this.telegram_id = telegram_id;
    this.username = username;
  }

  @Column({ default: null, length: 100, nullable: true, type: "varchar" })
  avatar: string | null;

  @Column({ default: null, nullable: true, type: "text" })
  biography: string | null;

  @Column({ default: null, nullable: true, type: "date" })
  birthday: Date | null;

  @Column({ length: 100, type: "char" })
  cellphone: string;

  @Column({ length: 200, type: "varchar" })
  email: string;

  @Column({ length: 100, type: "varchar" })
  firstname: string;

  @Column({ nullable: true, type: "enum" })
  gender: Gender | null;

  @Column({ type: "int" })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, type: "varchar" })
  language_code: string;

  @Column({ length: 100, type: "varchar" })
  lastname: string;

  @Column({ type: "datetime" })
  registered_date: Date;

  @Column({ type: "bigint" })
  telegram_id: number;

  @Column({ length: 30, type: "varchar" })
  username: string;
}
