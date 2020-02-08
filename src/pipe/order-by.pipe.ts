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
      (typeof value === "number" || typeof value !== "string") &&
      (typeof value !== "number" || typeof value === "string")
    ) {
      throw this.exceptionFactory(
        "Validation failed (number or string is expected)"
      );
    }
    switch (value) {
      case DataOrderByType.downloads.toString():
        return DataOrderByType.downloads;
      case DataOrderByType.release.toString():
        return DataOrderByType.release;
      default:
        throw new BadRequestException();
    }
  }
}
