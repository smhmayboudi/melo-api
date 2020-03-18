import { AppHashIdPipe } from "./app.hash-id.pipe";
import { AppHashIdService } from "./app.hash-id.service";
import { AppHashIdServiceInterface } from "./app.hash-id.service.interface";
import { Test } from "@nestjs/testing";

describe("AppHashIdPipe", () => {
  const appHashIdServiceMock: AppHashIdServiceInterface = {
    decode: (): number => 0,
    encode: (): string => ""
  };

  let service: AppHashIdService;

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
    service = module.get<AppHashIdService>(AppHashIdService);
  });

  it("should be equal to a value", () => {
    expect(new AppHashIdPipe(service).transform("", { type: "body" })).toEqual(
      0
    );
  });

  it("transform should throw bad request error", () => {
    expect(() =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      new AppHashIdPipe(service).transform(0, { type: "body" })
    ).toThrowError();
  });

  it.todo("transform should throw an exception on typeof !== string");
});
