import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Optional,
  PipeTransform,
} from "@nestjs/common";
import { DataOrderByType } from "../data/data.order-by.type";

export interface AppOrderByPipeOptions {
  exceptionFactory?: (errors: string) => unknown;
}

@Injectable()
export class AppOrderByPipe implements PipeTransform<string, DataOrderByType> {
  protected exceptionFactory: (errors: string) => unknown;

  constructor(@Optional() options?: AppOrderByPipeOptions) {
    options = options || {};
    this.exceptionFactory =
      options.exceptionFactory ||
      ((error: string): unknown => new BadRequestException(error));
  }

  transform(value: string, _metadata: ArgumentMetadata): DataOrderByType {
    if (typeof value !== "string") {
      throw this.exceptionFactory("Validation failed (string is expected)");
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
