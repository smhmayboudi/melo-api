import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Optional,
  PipeTransform
} from "@nestjs/common";
import { SongOrderByType } from "../song/type/song.order-by.type";

export interface OrderByPipeOptions {
  exceptionFactory?: (errors: string) => any;
}

@Injectable()
export class OrderByPipe implements PipeTransform<string, SongOrderByType> {
  protected exceptionFactory: (errors: string) => any;

  constructor(@Optional() options?: OrderByPipeOptions) {
    options = options || {};

    this.exceptionFactory =
      options.exceptionFactory ||
      ((error: string): any => new BadRequestException(error));
  }

  transform(value: string, _metadata: ArgumentMetadata): SongOrderByType {
    if (
      typeof value !== "string" &&
      value !== SongOrderByType.downloads &&
      value !== SongOrderByType.release
    ) {
      throw this.exceptionFactory("Validation failed (string is expected)");
    }
    return value as SongOrderByType;
  }
}
