import { Injectable } from "@nestjs/common";
import {
  // PromInstanceCounter,
  PromMethodCounter
} from "../prom/prom.decorator";
import { ActionDto } from "./dto/action.dto";

@Injectable()
// @PromInstanceCounter
export class ActionService {
  @PromMethodCounter
  async bulk(_dto: ActionDto): Promise<void> {
    return Promise.resolve();
  }
}
