import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Optional,
  PipeTransform
} from "@nestjs/common";
import { DownloadSortByType } from "./download.sort-by.type";

export interface DownloadSortByPipeOptions {
  exceptionFactory?: (errors: string) => any;
}

@Injectable()
export class DownloadSortByPipe
  implements PipeTransform<string, DownloadSortByType> {
  protected exceptionFactory: (errors: string) => any;

  constructor(@Optional() options?: DownloadSortByPipeOptions) {
    options = options || {};
    this.exceptionFactory =
      options.exceptionFactory ||
      ((error: string): any => new BadRequestException(error));
  }

  transform(value: string, _metadata: ArgumentMetadata): DownloadSortByType {
    switch (value) {
      case DownloadSortByType.date.toString():
        return DownloadSortByType.date;
      default:
        throw new BadRequestException();
    }
  }
}