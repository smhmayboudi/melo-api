import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Optional,
  PipeTransform
} from "@nestjs/common";
import { OrderBy } from "../data/type/order-by.type";

export interface OrderByPipeOptions {
  exceptionFactory?: (errors: string) => any;
}

@Injectable()
export class OrderByPipe implements PipeTransform<OrderBy> {
  protected exceptionFactory: (errors: string) => any;

  constructor(@Optional() options?: OrderByPipeOptions) {
    options = options || {};

    this.exceptionFactory =
      options.exceptionFactory ||
      ((error: string): any => new BadRequestException(error));
  }

  transform(value: string, _metadata: ArgumentMetadata): OrderBy {
    if (
      typeof value !== "string" &&
      value !== OrderBy.downloads &&
      value !== OrderBy.release
    ) {
      throw this.exceptionFactory("Validation failed (string is expected)");
    }
    return value as OrderBy;
  }
}
