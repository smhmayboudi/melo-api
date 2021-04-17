import { RtResDto } from "@melo/common";
import { RtService } from "../rt/rt.service";
import { RtServiceInterface } from "../rt/rt.service.interface";
import { Test } from "@nestjs/testing";
import { TokenStrategy } from "./token.strategy";

describe("TokenStrategy", () => {
  const date = new Date();
  const rt: RtResDto = {
    created_at: date,
    description: "",
    expire_at: new Date(Date.now() + 1000),
    id: 0,
    is_blocked: false,
    token: "",
    user_id: 0,
  };

  const rtServiceMock: RtServiceInterface = {
    block: () => Promise.resolve(rt),
    blockByToken: () => Promise.resolve(rt),
    delete: () => Promise.resolve(rt),
    deleteByToken: () => Promise.resolve(rt),
    find: () => Promise.resolve([rt]),
    findOne: () => Promise.resolve(rt),
    findOneByToken: () => Promise.resolve(rt),
    save: () => Promise.resolve(rt),
    validate: () => Promise.resolve(rt),
    validateByToken: () => Promise.resolve(rt),
  };

  let service: RtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: RtService,
          useValue: rtServiceMock,
        },
      ],
    }).compile();
    service = module.get<RtService>(RtService);
  });

  it("should be defined", () => {
    expect(new TokenStrategy(service)).toBeDefined();
  });

  it("validate should be equal to an auth strategy", async () => {
    expect(await new TokenStrategy(service).validate("")).toEqual({
      sub: "0",
    });
  });

  it("validate should throw an error", async () => {
    const rtServiceMockValidateByToken: RtServiceInterface = {
      ...rtServiceMock,
      validateByToken: () => Promise.resolve(undefined),
    };

    const module = await Test.createTestingModule({
      providers: [
        {
          provide: RtService,
          useValue: rtServiceMockValidateByToken,
        },
      ],
    }).compile();
    service = module.get<RtService>(RtService);

    return expect(
      new TokenStrategy(service).validate("")
    ).rejects.toThrowError();
  });
});
