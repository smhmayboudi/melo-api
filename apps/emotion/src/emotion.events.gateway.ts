import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";

import { EMOTION_SERVICE } from "@melo/common";
import { Logger } from "@nestjs/common";

@WebSocketGateway()
export class EmotionEventsGateway {
  @SubscribeMessage("events")
  handleMessage(@MessageBody() data: unknown): boolean {
    Logger.log(`data: ${data}`, EMOTION_SERVICE);
    return true;
  }
}
