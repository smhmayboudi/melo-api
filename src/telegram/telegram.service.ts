import { Injectable } from "@nestjs/common";
import { TelegramSendSongDto } from "./dto/telegram.send.song.dto";

@Injectable()
export class TelegramService {
  // constructor() {}

  async sendSong(dto: TelegramSendSongDto): Promise<any> {
    return Promise.resolve(dto);
  }
}
