import { Injectable } from "@nestjs/common";
import { ActionDto } from "./dto/action.dto";

@Injectable()
export class ActionService {
  // constructor() {}

  async bulk(_dto: ActionDto): Promise<void> {
    return Promise.resolve();
  }
}
