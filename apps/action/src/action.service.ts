import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";

import { ActionBulkReqDto } from "@melo/common";
import { ActionServiceInterface } from "./action.service.interface";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class ActionService implements ActionServiceInterface {
  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async bulk(dto: ActionBulkReqDto): Promise<ActionBulkReqDto> {
    return Promise.resolve(dto);
  }
}
