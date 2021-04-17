import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";

import { Logger } from "@nestjs/common";
import { RELATION_SERVICE } from "@melo/common";

@WebSocketGateway()
export class RelationEventsGateway {
  @SubscribeMessage("events")
  handleMessage(@MessageBody() data: unknown): boolean {
    Logger.log(`data: ${data}`, RELATION_SERVICE);
    return true;
  }
}
