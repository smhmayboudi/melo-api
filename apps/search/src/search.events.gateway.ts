import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";

import { Logger } from "@nestjs/common";
import { SEARCH_SERVICE } from "@melo/common";

@WebSocketGateway()
export class SearchEventsGateway {
  @SubscribeMessage("events")
  handleMessage(@MessageBody() data: unknown): boolean {
    Logger.log(`data: ${data}`, SEARCH_SERVICE);
    return true;
  }
}
