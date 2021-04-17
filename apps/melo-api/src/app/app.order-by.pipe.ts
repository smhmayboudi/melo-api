import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Optional,
  PipeTransform,
} from "@nestjs/common";
import { SongOrderByType } from "@melo/common";

export interface AppOrderByPipeOptions {
  exceptionFactory?: (errors: string) => unknown;
}

@Injectable()
export class AppOrderByPipe implements PipeTransform<string, SongOrderByType> {
  private exceptionFactory: (errors: string) => unknown;

  constructor(@Optional() options?: AppOrderByPipeOptions) {
    const newOptions = options || {};
    this.exceptionFactory =
      newOptions.exceptionFactory ||
      ((error: string): unknown => new BadRequestException(error));
  }

  transform(value: string, _metadata: ArgumentMetadata): SongOrderByType {
    if (typeof value !== "string") {
      throw this.exceptionFactory("Validation failed (string is expected)");
    }
    switch (value) {
      case SongOrderByType.downloads.toString():
        return SongOrderByType.downloads;
      case SongOrderByType.release.toString():
        return SongOrderByType.release;
      default:
        throw new BadRequestException();
    }
  }
}
