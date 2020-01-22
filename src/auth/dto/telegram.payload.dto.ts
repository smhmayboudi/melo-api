export class TelegramPayloadDto {
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
  auth_date: number;
  first_name: string;
  hash: string;
  id: number;
  last_name: string;
  photo_url: string;
  username: string;
}
