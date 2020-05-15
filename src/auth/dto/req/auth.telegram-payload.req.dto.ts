import { IsNumberString, IsString } from "class-validator";

export class AuthTelegramPayloadReqDto {
  constructor(
    auth_date: number,
    first_name: string,
    hash: string,
    id: number,
    last_name: string,
    photo_url: string,
    username: string
  ) {
    this.auth_date = auth_date;
    this.first_name = first_name;
    this.hash = hash;
    this.id = id;
    this.last_name = last_name;
    this.photo_url = photo_url;
    this.username = username;
  }

  @IsNumberString()
  readonly auth_date: number;

  @IsString()
  readonly first_name: string;

  @IsString()
  readonly hash: string;

  @IsNumberString()
  readonly id: number;

  @IsString()
  readonly last_name: string;

  @IsString()
  readonly photo_url: string;

  @IsString()
  readonly username: string;
}
