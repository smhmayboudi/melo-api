import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";

import { ARTIST_SERVICE } from "@melo/common";
import { Logger } from "@nestjs/common";

@WebSocketGateway()
export class ArtistEventsGateway {
  @SubscribeMessage("events")
  handleMessage(@MessageBody() data: unknown): boolean {
    Logger.log(`data: ${data}`, ARTIST_SERVICE);
    return true;
  }
}
