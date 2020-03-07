import { Test } from "@nestjs/testing";
import { AppHashIdPipe } from "./app.hash-id.pipe";
import { AppHashIdService } from "./app.hash-id.service";
import { AppHashIdServiceInterface } from "./app.hash-id.service.interface";

describe("AppHashIdPipe", () => {
  const appHashIdServiceMock: AppHashIdServiceInterface = {
    decode: (): number => 0,
    encode: (): string => ""
  };

  let appHashIdPipe: AppHashIdPipe;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AppHashIdPipe,
        {
          provide: AppHashIdService,
          useValue: appHashIdServiceMock
        }
      ]
    }).compile();
    appHashIdPipe = module.get<AppHashIdPipe>(AppHashIdPipe);
  });
  it("should be defined", () => {
    jest.spyOn(appHashIdPipe, "transform").mockImplementation(() => 0);
    expect(appHashIdPipe.transform("", { type: "body" })).toBeDefined();
  });
});
