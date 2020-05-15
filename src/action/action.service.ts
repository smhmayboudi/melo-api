import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";

import { ActionDto } from "./dto/action.dto";
import { ActionServiceInterface } from "./action.service.interface";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class ActionService implements ActionServiceInterface {
  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async bulk(dto: ActionDto): Promise<ActionDto> {
    return Promise.resolve(dto);
  }
}
