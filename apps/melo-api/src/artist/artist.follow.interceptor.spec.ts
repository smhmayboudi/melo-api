import { ArtistResDto, ArtistType, ConstImageResDto } from "@melo/common";
import { CallHandler, ExecutionContext } from "@nestjs/common";

import { AppArtistService } from "../app/app.artist.service";
import { AppArtistServiceInterface } from "../app/app.artist.service.interface";
import { ArtistFollowInterceptor } from "./artist.follow.interceptor";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Test } from "@nestjs/testing";
import { of } from "rxjs";

describe("ArtistFollowInterceptor", () => {
  const httpArgumentsHost: HttpArgumentsHost = {
    getNext: jest.fn(),
    getRequest: jest.fn().mockImplementation(() => ({
      user: {
        sub: "1",
      },
    })),
    getResponse: jest.fn().mockImplementation(() => ({
      statusCode: 200,
    })),
  };
  const executionContext: ExecutionContext = {
    getArgByIndex: jest.fn(),
    getArgs: jest.fn(),
    getClass: jest.fn(),
    getHandler: jest.fn(),
    getType: jest.fn(),
    switchToHttp: () => httpArgumentsHost,
    switchToRpc: jest.fn(),
    switchToWs: jest.fn(),
  };
  const image: ConstImageResDto = {
    cover: {
      url:
        "Cz6suIAYeF_rXp18UTsU4bHL-gaGsq2PpE2_dLMWj9s/rs:fill:1024:1024:1/dpr:1/plain/asset/pop.jpg",
    },
  };
  const artist: ArtistResDto = {
    followersCount: 0,
    fullName: "",
    id: 0,
    image,
    sumSongsDownloadsCount: 1,
    tags: [""],
    type: ArtistType.prime,
  };

  const appArtistServiceMock: AppArtistServiceInterface = {
    follow: () => Promise.resolve(artist),
    follows: () => Promise.resolve([artist]),
  };

  let service: AppArtistService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: AppArtistService, useValue: appArtistServiceMock },
      ],
    }).compile();
    service = module.get<AppArtistService>(AppArtistService);
  });

  it("should be defined", () => {
    expect(new ArtistFollowInterceptor(service)).toBeDefined();
  });

  it("intercept should be called sub: 0", () => {
    const httpArgumentsHostUserSubZero: HttpArgumentsHost = {
      ...httpArgumentsHost,
      getRequest: jest.fn().mockImplementation(() => ({
        user: {
          sub: "0",
        },
      })),
    };
    const executionContextSubZero: ExecutionContext = {
      ...executionContext,
      switchToHttp: () => httpArgumentsHostUserSubZero,
    };
    const callHandler: CallHandler = {
      handle: jest.fn(() => of("")),
    };
    new ArtistFollowInterceptor(service)
      .intercept(executionContextSubZero, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHostUserSubZero.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: single artist", () => {
    const callHandler: CallHandler = {
      handle: jest.fn(() => of(artist)),
    };
    new ArtistFollowInterceptor(service)
      .intercept(executionContext, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: list of artists", () => {
    const callHandler: CallHandler = {
      handle: jest.fn(() => of([artist])),
    };
    new ArtistFollowInterceptor(service)
      .intercept(executionContext, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });
});
