import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString
} from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "./type/Gender";

@Entity({ name: "users", orderBy: { id: "ASC" } })
export class UserEntity {
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

  @ApiProperty({
    description: "The avatar link",
    example: "http://www.google.com/avatar.jpg"
  })
  @Column({ default: null, length: 100, nullable: true, type: "varchar" })
  @IsOptional()
  @IsString()
  avatar: string | null;

  @ApiProperty({
    description: "Small description of user",
    example: "He tries to bridge the system."
  })
  @Column({ default: null, nullable: true, type: "text" })
  @IsOptional()
  @IsString()
  biography: string | null;

  @ApiProperty({
    description: "The birthdate",
    example: new Date()
  })
  @Column({ default: null, nullable: true, type: "date" })
  @IsDate()
  @IsOptional()
  birthday: Date | null;

  @ApiProperty({
    description: "The cellphone number",
    example: 9121234567
  })
  @Column({ length: 100, type: "char" })
  @IsString()
  cellphone: string;

  @ApiProperty({
    description: "The primary key",
    example: "abc@def.ghi"
  })
  @Column({ length: 200, type: "varchar" })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "The firstname",
    example: "john"
  })
  @Column({ length: 100, type: "varchar" })
  @IsString()
  firstname: string;

  @ApiProperty({
    description: "The gender",
    enum: ["female", "male"],
    example: "male"
  })
  @Column({ nullable: true, type: "enum" })
  @IsEnum(Gender)
  @IsOptional()
  gender: Gender | null;

  @ApiProperty({
    description: "The primary key",
    example: 0
  })
  @PrimaryGeneratedColumn("increment", { type: "int" })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: "The language",
    example: "en"
  })
  @Column({ length: 20, type: "varchar" })
  @IsString()
  language_code: string;

  @ApiProperty({
    description: "The lastname",
    example: "smith"
  })
  @Column({ length: 100, type: "varchar" })
  @IsString()
  lastname: string;

  @ApiProperty({
    description: "The registration date",
    example: new Date()
  })
  @Column({ type: "datetime" })
  @IsDate()
  registered_date: Date;

  @ApiProperty({
    description: "The telegram identification",
    example: "@johnsmith"
  })
  @Column({ type: "bigint" })
  @IsNumber()
  telegram_id: number;

  @ApiProperty({
    description: "The username",
    example: "johnsmith"
  })
  @Column({ length: 30, type: "varchar" })
  @IsString()
  username: string;
}
