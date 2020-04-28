import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Optional,
  PipeTransform,
} from "@nestjs/common";
import { DownloadSortByType } from "./download.sort-by.type";

export interface DownloadSortByPipeOptions {
  exceptionFactory?: (errors: string) => unknown;
}

@Injectable()
export class DownloadSortByPipe
  implements PipeTransform<string, DownloadSortByType> {
  protected exceptionFactory: (errors: string) => unknown;

  constructor(@Optional() options?: DownloadSortByPipeOptions) {
    options = options || {};
    this.exceptionFactory =
      options.exceptionFactory ||
      ((error: string): unknown => new BadRequestException(error));
  }

  transform(value: string, _metadata: ArgumentMetadata): DownloadSortByType {
    if (typeof value !== "string") {
      throw this.exceptionFactory("Validation failed (string is expected)");
    }
    switch (value) {
      case DownloadSortByType.date.toString():
        return DownloadSortByType.date;
      default:
        throw new BadRequestException();
    }
  }
}
