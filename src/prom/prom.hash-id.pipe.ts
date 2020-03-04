import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Optional,
  PipeTransform
} from "@nestjs/common";
import { Registry } from "prom-client";
import { InjectRegister } from "./prom.decorator";

export interface PromHashIdPipeOptions {
  exceptionFactory?: (errors: string) => any;
}

@Injectable()
export class PromHashIdPipe implements PipeTransform<string, Registry> {
  protected exceptionFactory: (errors: string) => any;

  constructor(
    @InjectRegister()
    private readonly registry: Registry,
    @Optional() options?: PromHashIdPipeOptions
  ) {
    options = options || {};
    this.exceptionFactory =
      options.exceptionFactory ||
      ((error: string): any => new BadRequestException(error));
  }

  transform(_value: string, _metadata: ArgumentMetadata): Registry {
    return this.registry;
  }
}
