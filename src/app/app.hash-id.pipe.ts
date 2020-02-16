import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Optional,
  PipeTransform
} from "@nestjs/common";
import { AppHashIdService } from "./app.hash-id.service";

export interface AppHashIdPipeOptions {
  exceptionFactory?: (errors: string) => any;
}

@Injectable()
export class AppHashIdPipe implements PipeTransform<string, number> {
  protected exceptionFactory: (errors: string) => any;

  constructor(
    private readonly appHashIdService: AppHashIdService,
    @Optional() options?: AppHashIdPipeOptions
  ) {
    options = options || {};

    this.exceptionFactory =
      options.exceptionFactory ||
      ((error: string): any => new BadRequestException(error));
  }

  transform(value: string, _metadata: ArgumentMetadata): number {
    if (typeof value !== "string") {
      throw this.exceptionFactory("Validation failed (string is expected)");
    }
    return this.appHashIdService.decode(value);
  }
}
