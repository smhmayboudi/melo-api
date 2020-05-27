import { ACTION_SERVICE_BULK, ActionBulkReqDto } from "@melo/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { ActionService } from "./action.service";
import { Controller } from "@nestjs/common";

@Controller()
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @MessagePattern(ACTION_SERVICE_BULK)
  bulk(@Payload() dto: ActionBulkReqDto): Promise<ActionBulkReqDto> {
    return this.actionService.bulk(dto);
  }
}
