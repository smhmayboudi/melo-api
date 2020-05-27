import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Optional,
  PipeTransform,
} from "@nestjs/common";
import { DownloadOrderByType } from "@melo/common";

export interface DownloadOrderByPipeOptions {
  exceptionFactory?: (errors: string) => unknown;
}

@Injectable()
export class DownloadOrderByPipe
  implements PipeTransform<string, DownloadOrderByType> {
  private exceptionFactory: (errors: string) => unknown;

  constructor(@Optional() options?: DownloadOrderByPipeOptions) {
    const newOptions = options || {};
    this.exceptionFactory =
      newOptions.exceptionFactory ||
      ((error: string): unknown => new BadRequestException(error));
  }

  transform(value: string, _metadata: ArgumentMetadata): DownloadOrderByType {
    if (typeof value !== "string") {
      throw this.exceptionFactory("Validation failed (string is expected)");
    }
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
