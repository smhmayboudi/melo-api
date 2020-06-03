import { DGRAPH_INSTANCE_TOKEN } from "./dgraph.constant";
import { DgraphService } from "./dgraph.service";
import { Test } from "@nestjs/testing";

describe("DgraphService", () => {
  // TODO: interface ?
  const dgraphServiceMock = {
    setDebugMode: jest.fn(),
  };

  let service: DgraphService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DgraphService,
        {
          provide: DGRAPH_INSTANCE_TOKEN,
          useValue: dgraphServiceMock,
        },
      ],
    }).compile();
    service = module.get<DgraphService>(DgraphService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it.todo("client");
  it.todo("close");
});
