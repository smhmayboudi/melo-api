import { ClientsModule, Transport } from "@nestjs/microservices";
import { DATA_SERVICE, RELATION_SERVICE, USER_SERVICE } from "@melo/common";
import { HttpModule, Module } from "@nestjs/common";

import { SongController } from "./song.controller";
import { SongService } from "./song.service";
import ms from "ms";

@Module({
  controllers: [SongController],
  imports: [
    ClientsModule.register([
      {
        name: DATA_SERVICE,
        options: {
          url: process.env.DATA_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
      {
        name: RELATION_SERVICE,
        options: {
          url: process.env.RELATION_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
      {
        name: USER_SERVICE,
        options: {
          url: process.env.USER_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
    ]),
    HttpModule.register({
      timeout: ms(process.env.SONG_SEND_TIMEOUT || "0"),
    }),
  ],
  providers: [SongService],
})
export class SongModule {}
