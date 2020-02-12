---
to: src/<%= h.changeCase.camel(name)%>/<%= h.changeCase.dot(name)%>.module.ts
unless_exists: true
---
import { MetricType, PromModule } from "@digikare/nestjs-prom";
import { CacheModule, forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppModule } from "../app.module";
import { <%= h.changeCase.pascal(name)%>CacheOptionsFactory } from "./<%= h.changeCase.dot(name)%>.cache.options.factory";
import config from "./<%= h.changeCase.dot(name)%>.config";
import { <%= h.changeCase.pascal(name)%>ConfigService } from "./<%= h.changeCase.dot(name)%>.config.service";
import { <%= h.changeCase.pascal(name)%>EntityRepository } from "./<%= h.changeCase.dot(name)%>.entity.repository";
import { <%= h.changeCase.pascal(name)%>Controller } from "./<%= h.changeCase.dot(name)%>.controller";
import { <%= h.changeCase.pascal(name)%>HealthIndicator } from "./action.health";
import { <%= h.changeCase.pascal(name)%>Service } from "./<%= h.changeCase.dot(name)%>.service";

@Module({
  controllers: [<%= h.changeCase.pascal(name)%>Controller],
  exports: [<%= h.changeCase.pascal(name)%>ConfigService, <%= h.changeCase.pascal(name)%>HealthIndicator, <%= h.changeCase.pascal(name)%>Service],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [<%= h.changeCase.pascal(name)%>Module],
      useClass: <%= h.changeCase.pascal(name)%>CacheOptionsFactory
    }),
    ConfigModule.forFeature(config),
    PromModule.forMetrics([
      {
        type: MetricType.Counter,
        configuration: {
          help: "<%= h.changeCase.humanize(name, true)%> counter",
          labelNames: ["function", "module", "service"],
          name: "<%= h.changeCase.underscore(name)%>_counter"
        }
      }
    ]),
    TypeOrmModule.forFeature([<%= h.changeCase.pascal(name)%>EntityRepository])
  ],
  providers: [<%= h.changeCase.pascal(name)%>ConfigService, <%= h.changeCase.pascal(name)%>Service]
})
export class <%= h.changeCase.pascal(name)%>Module {}
