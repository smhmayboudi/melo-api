import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";

import { JWKS_SERVICE } from "@melo/common";
import { Logger } from "@nestjs/common";

@WebSocketGateway()
export class JwksEventsGateway {
  @SubscribeMessage("events")
  handleMessage(@MessageBody() data: unknown): boolean {
    Logger.log(`data: ${data}`, JWKS_SERVICE);
    return true;
  }
}
