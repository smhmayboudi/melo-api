import { ClientsModule, Transport } from "@nestjs/microservices";
import { PLAYLIST, SONG_SERVICE } from "@melo/common";

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PlaylistController } from "./playlist.controller";
import { PlaylistSchema } from "./playlist.schema";
import { PlaylistService } from "./playlist.service";

@Module({
  controllers: [PlaylistController],
  imports: [
    ClientsModule.register([
      {
        name: SONG_SERVICE,
        options: {
          url: process.env.SONG_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
    ]),
    MongooseModule.forFeature([{ name: PLAYLIST, schema: PlaylistSchema }]),
  ],
  providers: [PlaylistService],
})
export class PlaylistModule {}
