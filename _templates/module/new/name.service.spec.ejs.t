---
to: src/<%= h.changeCase.camel(name)%>/<%= h.changeCase.dot(name)%>.service.spec.ts
unless_exists: true
---
import { Test, TestingModule } from "@nestjs/testing";
import { <%= h.changeCase.pascal(name)%>Service } from "./<%= h.changeCase.dot(name)%>.service";

describe("<%= h.changeCase.pascal(name)%>Service", () => {
  let service: <%= h.changeCase.pascal(name)%>Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [<%= h.changeCase.pascal(name)%>Service]
    }).compile();

    service = module.get<<%= h.changeCase.pascal(name)%>Service>(<%= h.changeCase.pascal(name)%>Service);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("findOne");
});
