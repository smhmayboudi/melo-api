import {
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
} from "@nestjs/terminus";

import { ActionHealthIndicator } from "../action/action.health.indicator";
import { AlbumHealthIndicator } from "../album/album.health.indicator";
import { AppHealthController } from "./app.health.controller";
import { AppHealthIndicator } from "./app.health.indicator";
import { AppHealthIndicatorInterface } from "@melo/common";
import { ArtistHealthIndicator } from "../artist/artist.health.indicator";
import { AtHealthIndicator } from "../at/at.health.indicator";
import { AuthHealthIndicator } from "../auth/auth.health.indicator";
import { ConstHealthIndicator } from "../const/const.health.indicator";
import { FileHealthIndicator } from "../file/file.health.indicator";
import { JwksHealthIndicator } from "../jwks/jwks.health.indicator";
import { PlaylistHealthIndicator } from "../playlist/playlist.health.indicator";
import { RelationHealthIndicator } from "../relation/relation.health.indicator";
import { RtHealthIndicator } from "../rt/rt.health.indicator";
import { SearchHealthIndicator } from "../search/search.health.indicator";
import { SongHealthIndicator } from "../song/song.health.indicator";
import { Test } from "@nestjs/testing";
import { UserHealthIndicator } from "../user/user.health.indicator";

describe("AppHealthController", () => {
  const actionHealthIndicatorResult: HealthIndicatorResult = {
    action: {
      status: "up",
    },
  };
  const albumHealthIndicatorResult: HealthIndicatorResult = {
    album: {
      status: "up",
    },
  };
  const appHealthIndicatorResult: HealthIndicatorResult = {
    app: {
      status: "up",
    },
  };
  const artistHealthIndicatorResult: HealthIndicatorResult = {
    artist: {
      status: "up",
    },
  };
  const atHealthIndicatorResult: HealthIndicatorResult = {
    at: {
      status: "up",
    },
  };
  const authHealthIndicatorResult: HealthIndicatorResult = {
    auth: {
      status: "up",
    },
  };
  const constHealthIndicatorResult: HealthIndicatorResult = {
    const: {
      status: "up",
    },
  };
  const fileHealthIndicatorResult: HealthIndicatorResult = {
    file: {
      status: "up",
    },
  };
  const jwksHealthIndicatorResult: HealthIndicatorResult = {
    jwks: {
      status: "up",
    },
  };
  const playlistHealthIndicatorResult: HealthIndicatorResult = {
    playlist: {
      status: "up",
    },
  };
  const relationHealthIndicatorResult: HealthIndicatorResult = {
    relation: {
      status: "up",
    },
  };
  const rtHealthIndicatorResult: HealthIndicatorResult = {
    rt: {
      status: "up",
    },
  };
  const searchHealthIndicatorResult: HealthIndicatorResult = {
    search: {
      status: "up",
    },
  };
  const songHealthIndicatorResult: HealthIndicatorResult = {
    song: {
      status: "up",
    },
  };
  const userHealthIndicatorResult: HealthIndicatorResult = {
    user: {
      status: "up",
    },
  };
  const healthCheckResult: HealthCheckResult = {
    details: {
      ...actionHealthIndicatorResult,
      ...albumHealthIndicatorResult,
      ...appHealthIndicatorResult,
      ...artistHealthIndicatorResult,
      ...atHealthIndicatorResult,
      ...authHealthIndicatorResult,
      ...constHealthIndicatorResult,
      ...fileHealthIndicatorResult,
      ...jwksHealthIndicatorResult,
      ...playlistHealthIndicatorResult,
      ...relationHealthIndicatorResult,
      ...rtHealthIndicatorResult,
      ...searchHealthIndicatorResult,
      ...songHealthIndicatorResult,
      ...userHealthIndicatorResult,
    },
    error: {},
    info: {
      ...actionHealthIndicatorResult,
      ...albumHealthIndicatorResult,
      ...appHealthIndicatorResult,
      ...artistHealthIndicatorResult,
      ...atHealthIndicatorResult,
      ...authHealthIndicatorResult,
      ...constHealthIndicatorResult,
      ...fileHealthIndicatorResult,
      ...jwksHealthIndicatorResult,
      ...playlistHealthIndicatorResult,
      ...relationHealthIndicatorResult,
      ...rtHealthIndicatorResult,
      ...searchHealthIndicatorResult,
      ...songHealthIndicatorResult,
      ...userHealthIndicatorResult,
    },
    status: "ok",
  };

  let controller: AppHealthController;

  const actionHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: () => Promise.resolve(actionHealthIndicatorResult),
  };
  const albumHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: () => Promise.resolve(albumHealthIndicatorResult),
  };
  const appHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: () => Promise.resolve(appHealthIndicatorResult),
  };
  const artistHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: () => Promise.resolve(artistHealthIndicatorResult),
  };
  const atHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: () => Promise.resolve(atHealthIndicatorResult),
  };
  const authHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: () => Promise.resolve(authHealthIndicatorResult),
  };
  const constHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: () => Promise.resolve(constHealthIndicatorResult),
  };
  const fileHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: () => Promise.resolve(fileHealthIndicatorResult),
  };
  const jwksHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: () => Promise.resolve(jwksHealthIndicatorResult),
  };
  const playlistHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: () => Promise.resolve(playlistHealthIndicatorResult),
  };
  const relationHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: () => Promise.resolve(relationHealthIndicatorResult),
  };
  const rtHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: () => Promise.resolve(rtHealthIndicatorResult),
  };
  const searchHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: () => Promise.resolve(searchHealthIndicatorResult),
  };
  const songHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: () => Promise.resolve(songHealthIndicatorResult),
  };
  const userHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: () => Promise.resolve(userHealthIndicatorResult),
  };
  // TODO: interface ?
  const healthCheckServiceMock = {
    check: async (indicatorFunctions: any[]): Promise<HealthCheckResult> => {
      const indicator = (
        await Promise.all(
          indicatorFunctions.map(async (value) => await value())
        )
      ).reduceRight((previousValue, currentValue) => ({
        ...previousValue,
        ...currentValue,
      }));
      return Promise.resolve({
        details: indicator,
        error: {},
        info: indicator,
        status: "ok",
      });
    },
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AppHealthController],
      providers: [
        { provide: ActionHealthIndicator, useValue: actionHealthIndicatorMock },
        { provide: AlbumHealthIndicator, useValue: albumHealthIndicatorMock },
        { provide: AppHealthIndicator, useValue: appHealthIndicatorMock },
        { provide: ArtistHealthIndicator, useValue: artistHealthIndicatorMock },
        { provide: AtHealthIndicator, useValue: atHealthIndicatorMock },
        { provide: AuthHealthIndicator, useValue: authHealthIndicatorMock },
        { provide: ConstHealthIndicator, useValue: constHealthIndicatorMock },
        { provide: FileHealthIndicator, useValue: fileHealthIndicatorMock },
        { provide: HealthCheckService, useValue: healthCheckServiceMock },
        { provide: JwksHealthIndicator, useValue: jwksHealthIndicatorMock },
        {
          provide: PlaylistHealthIndicator,
          useValue: playlistHealthIndicatorMock,
        },
        {
          provide: RelationHealthIndicator,
          useValue: relationHealthIndicatorMock,
        },
        { provide: RtHealthIndicator, useValue: rtHealthIndicatorMock },
        { provide: SearchHealthIndicator, useValue: searchHealthIndicatorMock },
        { provide: SongHealthIndicator, useValue: songHealthIndicatorMock },
        { provide: UserHealthIndicator, useValue: userHealthIndicatorMock },
      ],
    }).compile();
    controller = module.get<AppHealthController>(AppHealthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("index should be called", async () => {
    expect(await controller.healthCheck()).toEqual(healthCheckResult);
  });
});
