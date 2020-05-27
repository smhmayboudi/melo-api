import * as Sentry from "@sentry/node";
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import {
  SENTRY_INSTANCE_TOKEN,
  SENTRY_MODULE_OPTIONS,
} from "./sentry.constant";
import { Handlers } from "@sentry/node";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Observable } from "rxjs";
import { Scope } from "@sentry/hub";
import { SentryModuleOptions } from "./sentry.module.interface";
import { tap } from "rxjs/operators";

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  private captureHttpException(
    scope: Scope,
    http: HttpArgumentsHost,
    exception
  ): void {
    const data = Handlers.parseRequest({}, http.getRequest(), this.options);
    scope.setExtra("req", data.request);
    if (data.extra !== undefined) {
      scope.setExtras(data.extra);
    }
    if (data.user !== undefined) {
      scope.setUser(data.user);
    }
    if (this.options.level !== undefined) {
      scope.setLevel(this.options.level);
    }
    if (this.options.fingerprint !== undefined) {
      scope.setFingerprint(this.options.fingerprint);
    }
    if (this.options.extra !== undefined) {
      scope.setExtras(this.options.extra);
    }
    if (this.options.tags !== undefined) {
      scope.setTags(this.options.tags);
    }
    this.sentry.captureException(exception);
  }

  private shouldReport(exception: any): boolean {
    return (
      this.options.filters === undefined ||
      this.options.filters.every(
        ({ type, filter }) =>
          !(
            exception instanceof type &&
            (filter === undefined || filter(exception))
          )
      )
    );
  }

  constructor(
    @Inject(SENTRY_MODULE_OPTIONS)
    private readonly options: SentryModuleOptions,
    @Inject(SENTRY_INSTANCE_TOKEN)
    private readonly sentry: typeof Sentry
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    return next.handle().pipe(
      tap(undefined, (error) => {
        if (this.shouldReport(error)) {
          this.sentry.withScope((scope) => {
            this.captureHttpException(scope, http, error);
          });
        }
      })
    );
  }
}
