import { CounterMetric, InjectCounterMetric } from "@digikare/nestjs-prom";
import { Injectable } from "@nestjs/common";
import { ActionDto } from "./dto/action.dto";

@Injectable()
export class ActionService {
  constructor(
    @InjectCounterMetric("action_counter")
    private readonly counterMetric: CounterMetric
  ) {}

  async bulk(_dto: ActionDto): Promise<void> {
    this.counterMetric.inc(
      { module: "action", service: "action", function: "bulk" },
      1,
      Date.now()
    );
    return Promise.resolve();
  }
}
