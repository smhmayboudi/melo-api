import { ClientsModule, Transport } from "@nestjs/microservices";
import { PLAYLIST, SONG_SERVICE } from "@melo/common";

import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PlaylistConfigService } from "./playlist.config.service";
import { PlaylistController } from "./playlist.controller";
import { PlaylistEventsGateway } from "./playlist.events.gateway";
import { PlaylistMongooseOptionsFactory } from "./playlist.mongoose.options.factory";
import { PlaylistSchema } from "./playlist.schema";
import { PlaylistService } from "./playlist.service";
import config from "./playlist.config";

@Module({
  controllers: [PlaylistController],
  exports: [PlaylistConfigService, PlaylistService],
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
    ConfigModule.forFeature(config),
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: PLAYLIST, schema: PlaylistSchema }]),
    MongooseModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [PlaylistModule],
      useClass: PlaylistMongooseOptionsFactory,
    }),
  ],
  providers: [PlaylistConfigService, PlaylistEventsGateway, PlaylistService],
})
export class PlaylistModule {}
