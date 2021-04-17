import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";

import { Logger } from "@nestjs/common";
import { USER_SERVICE } from "@melo/common";

@WebSocketGateway()
export class UserEventsGateway {
  @SubscribeMessage("events")
  handleMessage(@MessageBody() data: unknown): boolean {
    Logger.log(`data: ${data}`, USER_SERVICE);
    return true;
  }
}
