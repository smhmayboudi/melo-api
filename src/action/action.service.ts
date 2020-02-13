import { CounterMetric, InjectCounterMetric } from "@digikare/nestjs-prom";
import { Injectable } from "@nestjs/common";
import { ActionModule } from "./action.module";
import { ActionDto } from "./dto/action.dto";

@Injectable()
export class ActionService {
  constructor(
    @InjectCounterMetric("action_counter")
    private readonly counterMetric: CounterMetric
  ) {}

  async bulk(_dto: ActionDto): Promise<void> {
    this.counterMetric.inc({
      module: ActionModule.name,
      service: ActionService.name,
      function: this.bulk.name
    });
    return Promise.resolve();
  }
}
