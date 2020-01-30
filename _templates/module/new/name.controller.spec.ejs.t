---
to: src/<%= h.changeCase.camel(name)%>/<%= h.changeCase.dot(name)%>.controller.spec.ts
unless_exists: true
---
import { Test, TestingModule } from "@nestjs/testing";
import { <%= h.changeCase.pascal(name)%>Controller } from "./<%= h.changeCase.dot(name)%>.controller";

describe("<%= h.changeCase.pascal(name)%>Controller", () => {
  let controller: <%= h.changeCase.pascal(name)%>Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [<%= h.changeCase.pascal(name)%>Controller]
    }).compile();

    controller = module.get<<%= h.changeCase.pascal(name)%>Controller>(<%= h.changeCase.pascal(name)%>Controller);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  test.todo("findOne");
});
