import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";

import { FILE_SERVICE } from "@melo/common";
import { Logger } from "@nestjs/common";

@WebSocketGateway()
export class FileEventsGateway {
  @SubscribeMessage("events")
  handleMessage(@MessageBody() data: unknown): boolean {
    Logger.log(`data: ${data}`, FILE_SERVICE);
    return true;
  }
}
