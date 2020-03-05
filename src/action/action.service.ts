import { Injectable } from "@nestjs/common";
import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";
import {
  // PromInstanceCounter,
  PromMethodCounter
} from "../prom/prom.decorator";
import { ActionDto } from "./dto/action.dto";

@Injectable()
// @PromInstanceCounter
export class ActionService {
  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async bulk(dto: ActionDto): Promise<ActionDto> {
    return Promise.resolve(dto);
  }
}
