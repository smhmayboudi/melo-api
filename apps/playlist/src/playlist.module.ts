import { ClientsModule, Transport } from "@nestjs/microservices";
import { PLAYLIST, SONG_SERVICE } from "@melo/common";

import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PlaylistConfigService } from "./playlist.config.service";
import { PlaylistController } from "./playlist.controller";
import { PlaylistSchema } from "./playlist.schema";
import { PlaylistService } from "./playlist.service";
import config from "./playlist.config";

@Module({
  controllers: [PlaylistController],
  imports: [
    ConfigModule.forFeature(config),
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
  providers: [PlaylistConfigService, PlaylistService],
})
export class PlaylistModule {}
