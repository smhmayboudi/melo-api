import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from "class-validator";

import { UserGenderType } from "@melo/common";

@Entity({ name: "users", orderBy: { id: "ASC" } })
export class UserEntity {
  constructor(
    id: number,
    avatar?: string,
    biography?: string,
    birthday?: Date,
    cellphone?: string,
    email?: string,
    firstname?: string,
    gender?: UserGenderType,
    language_code?: string,
    lastname?: string,
    registered_date?: Date,
    telegram_id?: number,
    username?: string
  ) {
    this.id = id;
    this.avatar = avatar;
    this.biography = biography;
    this.birthday = birthday;
    this.cellphone = cellphone;
    this.email = email;
    this.firstname = firstname;
    this.gender = gender;
    this.language_code = language_code;
    this.lastname = lastname;
    this.registered_date = registered_date;
    this.telegram_id = telegram_id;
    this.username = username;
  }

  @PrimaryGeneratedColumn("increment", { type: "int" })
  @IsNumberString()
  id: number;

  @Column({ length: 100, nullable: true, type: "varchar" })
  @IsOptional()
  @IsString()
  avatar?: string;

  @Column({ nullable: true, type: "text" })
  @IsOptional()
  @IsString()
  biography?: string;

  @Column({ nullable: true, type: "date" })
  @IsDate()
  @IsOptional()
  birthday?: Date;

  @Column({ length: 100, nullable: true, type: "char" })
  @IsPhoneNumber("IR")
  @IsOptional()
  @IsString()
  cellphone?: string;

  @Column({ length: 200, nullable: true, type: "varchar" })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Column({ length: 100, nullable: true, type: "varchar" })
  @IsOptional()
  @IsString()
  firstname?: string;

  @Column({
    enum: ["female", "male"],
    enumName: "UserGenderType",
    nullable: true,
    type: "enum",
  })
  @IsEnum(UserGenderType)
  @IsOptional()
  gender?: UserGenderType;

  @Column({ length: 20, nullable: true, type: "varchar" })
  @IsOptional()
  @IsString()
  language_code?: string;

  @Column({ length: 100, nullable: true, type: "varchar" })
  @IsOptional()
  @IsString()
  lastname?: string;

  @Column({ nullable: true, type: "datetime" })
  @IsDate()
  @IsOptional()
  registered_date?: Date;

  @Column({ nullable: true, type: "bigint" })
  @IsNumberString()
  @IsOptional()
  telegram_id?: number;

  @Column({ length: 30, nullable: true, type: "varchar" })
  @IsOptional()
  @IsString()
  username?: string;
}
