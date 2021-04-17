import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";

import { Logger } from "@nestjs/common";
import { TAG_SERVICE } from "@melo/common";

@WebSocketGateway()
export class TagEventsGateway {
  @SubscribeMessage("events")
  handleMessage(@MessageBody() data: unknown): boolean {
    Logger.log(`data: ${data}`, TAG_SERVICE);
    return true;
  }
}
