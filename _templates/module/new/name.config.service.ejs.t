---
to: src/<%= h.changeCase.camel(name)%>/<%= h.changeCase.dot(name)%>.config.service.ts
unless_exists: true
---
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppConfigService } from "../app.config.service";

@Injectable()
export class <%= h.changeCase.pascal(name)%>ConfigService {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly configService: ConfigService
  ) {}

  get cacheHost(): string {
    return this.configService.get<string>(
      "<%= h.changeCase.camel(name)%>.cacheHost",
      this.appConfigService.cacheHost
    );
  }

  get cacheMax(): number {
    return this.configService.get<number>(
      "<%= h.changeCase.camel(name)%>.cacheMax",
      this.appConfigService.cacheMax
    );
  }

  get cachePort(): number {
    return this.configService.get<number>(
      "<%= h.changeCase.camel(name)%>.cachePort",
      this.appConfigService.cachePort
    );
  }

  get cacheTTL(): number {
    return this.configService.get<number>(
      "<%= h.changeCase.camel(name)%>.cacheTTL",
      this.appConfigService.cacheTTL
    );
  }
}