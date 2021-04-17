import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UserFindOneByUsernameReqDto {
  constructor(username: string) {
    this.username = username;
  }

  @ApiProperty({
    description: "The username",
    example: "abcdef",
  })
  @IsString()
  readonly username: string;
}
