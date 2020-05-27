import { Test, TestingModule } from "@nestjs/testing";

import { RtResDto } from "@melo/common";
import { RtService } from "../rt/rt.service";
import { RtServiceInterface } from "../rt/rt.service.interface";
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
    block: (): Promise<RtResDto> => Promise.resolve(rt),
    blockByToken: (): Promise<RtResDto> => Promise.resolve(rt),
    delete: (): Promise<RtResDto> => Promise.resolve(rt),
    deleteByToken: (): Promise<RtResDto> => Promise.resolve(rt),
    find: (): Promise<RtResDto[]> => Promise.resolve([rt]),
    findOne: (): Promise<RtResDto> => Promise.resolve(rt),
    findOneByToken: (): Promise<RtResDto> => Promise.resolve(rt),
    save: (): Promise<RtResDto> => Promise.resolve(rt),
    validate: (): Promise<RtResDto> => Promise.resolve(rt),
    validateByToken: (): Promise<RtResDto> => Promise.resolve(rt),
  };

  let service: RtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      validateByToken: (): Promise<RtResDto | undefined> =>
        Promise.resolve(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
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
