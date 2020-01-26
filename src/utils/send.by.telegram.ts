/* eslint-disable @typescript-eslint/camelcase */
import { HttpService } from "@nestjs/common";
import { map } from "rxjs/operators";
import { AxiosResponse } from "axios";

export class Telegram {
  constructor(private readonly httpService: HttpService) {}

  async sendSong(_userId: number, songId: number): Promise<number> {
    //const telegramId = await getUserTelegramIdFromDB(userid)
    // TODO implement get telegramId from db
    const telegramId = 12;
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    //@ts-ignore
    // tslint:disable-next-line:no-require-imports
    require("tls").DEFAULT_ECDH_CURVE = "auto";

    // TODO: add env variable for url (TELEGRAM_BOT_WEB_HOOK_HOST)
    return this.httpService
      .post(`XXXX`, {
        update_id: 0,
        callback_query: {
          from: {
            id: telegramId,
            is_bot: false,
            first_name: "",
            username: undefined,
            language_code: "fa"
          },
          message: {
            chat: {
              id: telegramId,
              first_name: "",
              username: undefined,
              type: "private"
            },
            date: Math.round(new Date().getTime() / 1000)
          },
          data: `1:${songId},high,0`
        }
      })
      .pipe(
        map((value: AxiosResponse<number>) => {
          return value.data;
        })
      )
      .toPromise();
  }
}
