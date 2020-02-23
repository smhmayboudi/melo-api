import { Injectable } from "@nestjs/common";
// import { Counter } from "prom-client";
// import { InjectCounter } from "../prom/prom.decorators";
// import { ActionModule } from "./action.module";
import { ActionDto } from "./dto/action.dto";

@Injectable()
export class ActionService {
  // constructor(
  //   @InjectCounter("action")
  //   private readonly counter: Counter
  // ) {}

  async bulk(_dto: ActionDto): Promise<void> {
    // this.counter.inc({
    //   module: ActionModule.name,
    //   service: ActionService.name,
    //   function: this.bulk.name
    // });
    return Promise.resolve();
  }
}
