import { IsDate, IsString, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Gender } from "../type/Gender";

export class UserEditDto {
  constructor(
    birthday?: Date,
    firstname?: string,
    gender?: Gender,
    lastname?: string,
    photoId?: string
  ) {
    this.birthday = birthday;
    this.firstname = firstname;
    this.gender = gender;
    this.lastname = lastname;
    this.photoId = photoId;
  }

  @ApiProperty({
    description: "The birthdate",
    example: new Date()
  })
  @IsDate()
  birthday?: Date;

  @ApiProperty({
    description: "The firstname",
    example: 0
  })
  @IsString()
  firstname?: string;

  @ApiProperty({
    description: "The gender",
    example: Gender.male
  })
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({
    description: "The lastname",
    example: "smith"
  })
  @IsString()
  lastname?: string;

  @ApiProperty({
    description: "The photoId",
    example: "http://www.google.com/avatar.jpg"
  })
  @IsString()
  photoId?: string;
}
