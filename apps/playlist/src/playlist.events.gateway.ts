import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";

import { Logger } from "@nestjs/common";
import { PLAYLIST_SERVICE } from "@melo/common";

@WebSocketGateway()
export class PlaylistEventsGateway {
  @SubscribeMessage("events")
  handleMessage(@MessageBody() data: unknown): boolean {
    Logger.log(`data: ${data}`, PLAYLIST_SERVICE);
    return true;
  }
}
