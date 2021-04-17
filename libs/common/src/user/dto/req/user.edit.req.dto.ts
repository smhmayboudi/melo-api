import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

import { Type } from "class-transformer";
import { UserGenderType } from "../../user.gender.type";

export class UserEditReqDto {
  constructor(
    sub: number,
    birthday?: Date,
    firstname?: string,
    gender?: UserGenderType,
    lastname?: string,
    photoId?: string
  ) {
    this.sub = sub;
    this.birthday = birthday;
    this.firstname = firstname;
    this.gender = gender;
    this.lastname = lastname;
    this.photoId = photoId;
  }

  @ApiHideProperty()
  @IsNumber()
  readonly sub: number;

  @ApiProperty({
    description: "The birthdate",
    example: new Date(),
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  readonly birthday?: Date;

  @ApiProperty({
    description: "The firstname",
    example: "abcdef",
  })
  @IsOptional()
  @IsString()
  readonly firstname?: string;

  @ApiProperty({
    description: "The gender",
    example: UserGenderType.male,
  })
  @IsEnum(UserGenderType)
  @IsOptional()
  readonly gender?: UserGenderType;

  @ApiProperty({
    description: "The lastname",
    example: "smith",
  })
  @IsOptional()
  @IsString()
  readonly lastname?: string;

  @ApiProperty({
    description: "The photoId",
    example: "http://www.google.com/avatar.jpg",
  })
  @IsOptional()
  @IsString()
  readonly photoId?: string;
}
