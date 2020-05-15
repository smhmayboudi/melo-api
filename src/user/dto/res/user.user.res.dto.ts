import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { UserGenderType } from "../../user.gender.type";

export class UserUserResDto {
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
    example: "0",
  })
  @IsNumberString()
  readonly id: number;

  @ApiProperty({
    description: "The avatar link",
    example: "http://www.google.com/avatar.jpg",
  })
  @IsOptional()
  @IsString()
  readonly avatar?: string;

  @ApiProperty({
    description: "Small description of user",
    example: "He tries to bridge the system.",
  })
  @IsOptional()
  @IsString()
  readonly biography?: string;

  @ApiProperty({
    description: "The birthdate",
    example: new Date(),
  })
  @IsDate()
  @IsOptional()
  readonly birthday?: Date;

  @ApiProperty({
    description: "The cellphone number",
    example: 9121234567,
  })
  @IsPhoneNumber("IR")
  @IsOptional()
  @IsString()
  readonly cellphone?: string;

  @ApiProperty({
    description: "The primary key",
    example: "info@melobit.com",
  })
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @ApiProperty({
    description: "The firstname",
    example: "john",
  })
  @IsOptional()
  @IsString()
  readonly firstname?: string;

  @ApiProperty({
    description: "The gender",
    enum: ["female", "male"],
    example: UserGenderType.male,
  })
  @IsEnum(UserGenderType)
  @IsOptional()
  readonly gender?: UserGenderType;

  @ApiProperty({
    description: "The language",
    example: "en",
  })
  @IsOptional()
  @IsString()
  readonly language_code?: string;

  @ApiProperty({
    description: "The lastname",
    example: "smith",
  })
  @IsOptional()
  @IsString()
  readonly lastname?: string;

  @ApiProperty({
    description: "The registration date",
    example: new Date(),
  })
  @IsDate()
  @IsOptional()
  readonly registered_date?: Date;

  @ApiProperty({
    description: "The telegram identification",
    example: "@johnsmith",
  })
  @IsNumberString()
  @IsOptional()
  readonly telegram_id?: number;

  @ApiProperty({
    description: "The username",
    example: "johnsmith",
  })
  @IsOptional()
  @IsString()
  readonly username?: string;
}
