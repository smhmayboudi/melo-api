import { Injectable } from "@nestjs/common";
import { ActionDto } from "./dto/action.dto";

@Injectable()
export class ActionService {
  // constructor() {}

  async bulk(dto: ActionDto): Promise<boolean> {
    return Promise.resolve(dto !== undefined);
  }
}
