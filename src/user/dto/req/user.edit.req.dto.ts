import { IsDate, IsEnum, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserGenderType } from "../../user.gender.type";

export class UserEditReqDto {
  constructor(
    birthday?: Date,
    firstname?: string,
    gender?: UserGenderType,
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
  @IsOptional()
  birthday?: Date;

  @ApiProperty({
    description: "The firstname",
    example: "abcdef"
  })
  @IsOptional()
  @IsString()
  firstname?: string;

  @ApiProperty({
    description: "The gender",
    example: UserGenderType.male
  })
  @IsEnum(UserGenderType)
  @IsOptional()
  gender?: UserGenderType;

  @ApiProperty({
    description: "The lastname",
    example: "smith"
  })
  @IsOptional()
  @IsString()
  lastname?: string;

  @ApiProperty({
    description: "The photoId",
    example: "http://www.google.com/avatar.jpg"
  })
  @IsOptional()
  @IsString()
  photoId?: string;
}
