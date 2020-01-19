---
to: src/<%= h.changeCase.camel(name)%>/<%= h.changeCase.dot(name)%>.config.service.ts
unless_exists: true
---
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class <%= h.changeCase.pascal(name)%>ConfigService {
  constructor(private readonly configService: ConfigService) {}

  get cacheHost(): string {
    return this.configService.get<string>("<%= h.changeCase.camel(name)%>.cacheHost", "127.0.0.1");
  }

  get cacheMax(): number {
    return this.configService.get<number>("<%= h.changeCase.camel(name)%>.cacheMax", 10);
  }

  get cachePort(): number {
    return this.configService.get<number>("<%= h.changeCase.camel(name)%>.cachePort", 6379);
  }

  get cacheTTL(): number {
    return this.configService.get<number>("<%= h.changeCase.camel(name)%>.cacheTTL", 10);
  }
}
