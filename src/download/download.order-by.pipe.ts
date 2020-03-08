import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Optional,
  PipeTransform
} from "@nestjs/common";
import { DownloadOrderByType } from "./download.order-by.type";

export interface DownloadOrderByPipeOptions {
  exceptionFactory?: (errors: string) => any;
}

@Injectable()
export class DownloadOrderByPipe
  implements PipeTransform<string, DownloadOrderByType> {
  protected exceptionFactory: (errors: string) => any;

  constructor(@Optional() options?: DownloadOrderByPipeOptions) {
    options = options || {};
    this.exceptionFactory =
      options.exceptionFactory ||
      ((error: string): any => new BadRequestException(error));
  }

  transform(value: string, _metadata: ArgumentMetadata): DownloadOrderByType {
    switch (value) {
      case DownloadOrderByType.asc.toString():
        return DownloadOrderByType.asc;
      case DownloadOrderByType.desc.toString():
        return DownloadOrderByType.desc;
      default:
        throw new BadRequestException();
    }
  }
}
