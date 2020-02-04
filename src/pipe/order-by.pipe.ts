import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Optional,
  PipeTransform
} from "@nestjs/common";
import { DataOrderByType } from "../data/type/data.order-by.type";

export interface OrderByPipeOptions {
  exceptionFactory?: (errors: string) => any;
}

// TODO: Make a generic pipe to check enum
@Injectable()
export class OrderByPipe implements PipeTransform<string, DataOrderByType> {
  protected exceptionFactory: (errors: string) => any;

  constructor(@Optional() options?: OrderByPipeOptions) {
    options = options || {};

    this.exceptionFactory =
      options.exceptionFactory ||
      ((error: string): any => new BadRequestException(error));
  }

  transform(value: string, _metadata: ArgumentMetadata): DataOrderByType {
    if (
      typeof value !== "string" &&
      value !== DataOrderByType.downloads &&
      value !== DataOrderByType.release
    ) {
      throw this.exceptionFactory("Validation failed (string is expected)");
    }
    return value as DataOrderByType;
  }
}
