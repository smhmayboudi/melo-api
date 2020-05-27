import { ClientsModule, Transport } from "@nestjs/microservices";
import { DATA_SERVICE, PLAYLIST } from "@melo/common";

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
        name: DATA_SERVICE,
        options: {
          url: process.env.DATA_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
    ]),

    MongooseModule.forFeature([{ name: PLAYLIST, schema: PlaylistSchema }]),
  ],
  providers: [PlaylistService],
})
export class PlaylistModule {}
