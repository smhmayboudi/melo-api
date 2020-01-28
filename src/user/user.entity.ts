import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsPhoneNumber
} from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserGenderType } from "./type/user.gender-type";

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

  @ApiProperty({
    description: "The primary key",
    example: 0
  })
  @PrimaryGeneratedColumn("increment", { type: "int" })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: "The avatar link",
    example: "http://www.google.com/avatar.jpg"
  })
  @Column({ default: null, length: 100, nullable: true, type: "varchar" })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({
    description: "Small description of user",
    example: "He tries to bridge the system."
  })
  @Column({ default: null, nullable: true, type: "text" })
  @IsOptional()
  @IsString()
  biography?: string;

  @ApiProperty({
    description: "The birthdate",
    example: new Date()
  })
  @Column({ default: null, nullable: true, type: "date" })
  @IsDate()
  @IsOptional()
  birthday?: Date;

  @ApiProperty({
    description: "The cellphone number",
    example: 9121234567
  })
  @Column({ default: null, length: 100, nullable: true, type: "char" })
  @IsPhoneNumber("IR")
  @IsOptional()
  @IsString()
  cellphone?: string;

  @ApiProperty({
    description: "The primary key",
    example: "abc@def.ghi"
  })
  @Column({ default: null, length: 200, nullable: true, type: "varchar" })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: "The firstname",
    example: "john"
  })
  @Column({ default: null, length: 100, nullable: true, type: "varchar" })
  @IsOptional()
  @IsString()
  firstname?: string;

  @ApiProperty({
    description: "The gender",
    enum: ["female", "male"],
    example: UserGenderType.male
  })
  @Column({ nullable: true, type: "enum" })
  @IsEnum(UserGenderType)
  @IsOptional()
  gender?: UserGenderType;

  @ApiProperty({
    description: "The language",
    example: "en"
  })
  @Column({ default: null, length: 20, nullable: true, type: "varchar" })
  @IsOptional()
  @IsString()
  language_code?: string;

  @ApiProperty({
    description: "The lastname",
    example: "smith"
  })
  @Column({ default: null, length: 100, nullable: true, type: "varchar" })
  @IsOptional()
  @IsString()
  lastname?: string;

  @ApiProperty({
    description: "The registration date",
    example: new Date()
  })
  @Column({ default: null, type: "datetime", nullable: true })
  @IsDate()
  @IsOptional()
  registered_date?: Date;

  @ApiProperty({
    description: "The telegram identification",
    example: "@johnsmith"
  })
  @Column({ default: null, nullable: true, type: "bigint" })
  @IsNumber()
  @IsOptional()
  telegram_id?: number;

  @ApiProperty({
    description: "The username",
    example: "johnsmith"
  })
  @Column({ default: null, length: 30, nullable: true, type: "varchar" })
  @IsOptional()
  @IsString()
  username?: string;
}
