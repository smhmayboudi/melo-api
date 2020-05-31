import {
  ACTION_SERVICE,
  ACTION_SERVICE_BULK,
  ActionBulkReqDto,
} from "@melo/common";
import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { Inject, Injectable } from "@nestjs/common";

import { ActionServiceInterface } from "./action.service.interface";
import { ClientProxy } from "@nestjs/microservices";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class ActionService implements ActionServiceInterface {
  constructor(
    @Inject(ACTION_SERVICE) private readonly actionClientProxy: ClientProxy
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  bulk(dto: ActionBulkReqDto): Promise<ActionBulkReqDto> {
    return this.actionClientProxy
      .send<ActionBulkReqDto, ActionBulkReqDto>(ACTION_SERVICE_BULK, dto)
      .toPromise();
  }
}
