import { Test, TestingModule } from "@nestjs/testing";
import { RtServiceInterface } from "src/rt/rt.service.interface";
import { RtEntity } from "../rt/rt.entity";
import { RtService } from "../rt/rt.service";
import { TokenStrategy } from "./token.strategy";

describe("TokenStrategy", () => {
  const date = new Date();
  const rtEntity: RtEntity = {
    created_at: date,
    description: "",
    expire_at: new Date(Date.now() + 1000),
    id: 0,
    is_blocked: false,
    user_id: 0,
    token: ""
  };

  const rtServiceMock: RtServiceInterface = {
    blockById: (): Promise<RtEntity | undefined> => Promise.resolve(rtEntity),
    blockByToken: (): Promise<RtEntity | undefined> =>
      Promise.resolve(rtEntity),
    deleteById: (): Promise<RtEntity | undefined> => Promise.resolve(rtEntity),
    deleteByToken: (): Promise<void> => Promise.resolve(undefined),
    find: (): Promise<RtEntity[]> => Promise.resolve([rtEntity]),
    findOneById: (): Promise<RtEntity | undefined> => Promise.resolve(rtEntity),
    findOneByToken: (): Promise<RtEntity | undefined> =>
      Promise.resolve(rtEntity),
    save: (): Promise<RtEntity[]> => Promise.resolve([rtEntity]),
    validateBySub: (): Promise<RtEntity | undefined> =>
      Promise.resolve(rtEntity),
    validateByToken: (): Promise<RtEntity | undefined> =>
      Promise.resolve(rtEntity)
  };

  let service: RtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RtService,
          useValue: rtServiceMock
        }
      ]
    }).compile();
    service = module.get<RtService>(RtService);
  });

  it("should be defined", () => {
    expect(new TokenStrategy(service)).toBeDefined();
  });

  it("validate should return an auth strategy", async () => {
    expect(await new TokenStrategy(service).validate("")).toEqual({
      sub: "0"
    });
  });

  it.todo("UnauthorizedException");
});
