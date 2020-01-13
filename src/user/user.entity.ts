import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "./type/Gender";

@Entity({ name: "users", orderBy: { id: "ASC" } })
export class UserEntity {
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

  // constructor(partial: Partial<User>) {
  //   Object.assign(this, partial);
  // }

  @Column({ length: 11, type: "int" })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, type: "varchar" })
  username: string;

  @Column({ length: 100, type: "char" })
  cellphone: string;

  @Column({ type: "bigint" })
  telegram_id: number;

  @Column({ length: 20, type: "varchar" })
  language_code: string;

  @Column({ type: "datetime" })
  registered_date: Date;

  @Column({ length: 200, type: "varchar" })
  email: string;

  @Column({ length: 100, type: "varchar" })
  firstname: string;

  @Column({ length: 100, type: "varchar" })
  lastname: string;

  @Column({ nullable: true, type: "enum" })
  gender: Gender | null;

  @Column({ default: null, nullable: true, type: "date" })
  birthday: Date | null;

  @Column({ default: null, nullable: true, type: "text" })
  biography: string | null;

  @Column({ default: null, length: 100, nullable: true, type: "varchar" })
  avatar: string | null;
}
