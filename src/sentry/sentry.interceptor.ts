import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor
} from "@nestjs/common";
import {
  HttpArgumentsHost,
  RpcArgumentsHost,
  WsArgumentsHost
} from "@nestjs/common/interfaces";
import { GqlArgumentsHost, GraphQLArgumentsHost } from "@nestjs/graphql";
import { Scope } from "@sentry/hub";
import * as Sentry from "@sentry/node";
import { Handlers } from "@sentry/node";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import {
  SENTRY_INSTANCE_TOKEN,
  SENTRY_MODULE_OPTIONS
} from "./sentry.constant";
import { SentryModuleOptions } from "./sentry.module.interface";

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  constructor(
    @Inject(SENTRY_MODULE_OPTIONS)
    private readonly options: SentryModuleOptions,
    @Inject(SENTRY_INSTANCE_TOKEN)
    private readonly sentry: typeof Sentry
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const ws = context.switchToWs();
    const rpc = context.switchToRpc();
    if (this.options.context === undefined) {
      this.options.context = "Http";
    }
    return next.handle().pipe(
      tap(undefined, error => {
        if (this.shouldReport(error)) {
          this.sentry.withScope(scope => {
            // TODO: When https://github.com/nestjs/nest/issues/1581 gets implemented switch to that
            switch (this.options.context) {
              case "GraphQL":
                this.captureGraphQLException(
                  scope as any,
                  GqlArgumentsHost.create(context),
                  error
                );
                break;
              case "Http":
                this.captureHttpException(scope as any, http, error);
                break;
              case "Rpc":
                this.captureRpcException(scope as any, rpc, error);
                break;
              case "Ws":
                this.captureWsException(scope as any, ws, error);
                break;
            }
          });
        }
      })
    );
  }

  private captureGraphQLException(
    scope: Scope,
    gqlHost: GraphQLArgumentsHost,
    exception
  ): void {
    // Same as HttpException
    const data = Handlers.parseRequest(
      {} as any,
      gqlHost.getContext(),
      this.options
    );
    scope.setExtra("req", data.request);
    if (data.extra !== undefined) {
      scope.setExtras(data.extra);
    }
    if (data.user !== undefined) {
      scope.setUser(data.user);
    }
    // GraphQL Specifics
    const info = gqlHost.getInfo();
    scope.setExtra("fieldName", info.fieldName);
    const args = gqlHost.getArgs();
    scope.setExtra("args", args);
    this.captureException(exception, scope);
  }

  private captureHttpException(
    scope: Scope,
    http: HttpArgumentsHost,
    exception
  ): void {
    const data = Handlers.parseRequest(
      {} as any,
      http.getRequest(),
      this.options
    );
    scope.setExtra("req", data.request);
    if (data.extra !== undefined) {
      scope.setExtras(data.extra);
    }
    if (data.user !== undefined) {
      scope.setUser(data.user);
    }
    this.captureException(exception, scope);
  }

  private captureRpcException(
    scope: Scope,
    rpc: RpcArgumentsHost,
    exception
  ): void {
    scope.setExtra("rpc_data", rpc.getData());
    this.captureException(exception, scope);
  }

  private captureWsException(
    scope: Scope,
    ws: WsArgumentsHost,
    exception
  ): void {
    scope.setExtra("ws_client", ws.getClient());
    scope.setExtra("ws_data", ws.getData());
    this.captureException(exception, scope);
  }

  private captureException(exception, scope: Scope): void {
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
          !(exception instanceof type && (!filter || filter(exception)))
      )
    );
  }
}
