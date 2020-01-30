---
to: src/<%= h.changeCase.camel(name)%>/<%= h.changeCase.dot(name)%>.cache.options.factory.spec.ts
unless_exists: true
---
import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { <%= h.changeCase.pascal(name)%>CacheOptionsFactory } from "./<%= h.changeCase.dot(name)%>.cache.options.factory";
import { <%= h.changeCase.pascal(name)%>ConfigService } from "./<%= h.changeCase.dot(name)%>.config.service";

describe("<%= h.changeCase.pascal(name)%>Service", () => {
  let service: <%= h.changeCase.pascal(name)%>ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, <%= h.changeCase.pascal(name)%>ConfigService]
    }).compile();

    service = module.get<<%= h.changeCase.pascal(name)%>ConfigService>(<%= h.changeCase.pascal(name)%>ConfigService);
  });

  it("should be defined", () => {
    expect(new <%= h.changeCase.pascal(name)%>CacheOptionsFactory(service)).toBeDefined();
  });
});
