import {
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
} from "@nestjs/terminus";
import { Test, TestingModule } from "@nestjs/testing";

import { ActionHealthIndicator } from "../action/action.health.indicator";
import { AlbumHealthIndicator } from "../album/album.health.indicator";
import { AppHealthController } from "./app.health.controller";
import { AppHealthIndicator } from "./app.health.indicator";
import { AppHealthIndicatorInterface } from "./app.health.indicator.interfce";
import { ArtistHealthIndicator } from "../artist/artist.health.indicator";
import { AtHealthIndicator } from "../at/at.health.indicator";
import { AuthHealthIndicator } from "../auth/auth.health.indicator";
import { ConstHealthIndicator } from "../const/const.health.indicator";
import { DataHealthIndicator } from "../data/data.health.indicator";
import { FileHealthIndicator } from "../file/file.health.indicator";
import { JwksHealthIndicator } from "../jwks/jwks.health.indicator";
import { PlaylistHealthIndicator } from "../playlist/playlist.health.indicator";
import { RelationHealthIndicator } from "../relation/relation.health.indicator";
import { RtHealthIndicator } from "../rt/rt.health.indicator";
import { SearchHealthIndicator } from "../search/search.health.indicator";
import { SongHealthIndicator } from "../song/song.health.indicator";
import { UserHealthIndicator } from "../user/user.health.indicator";

describe("AppHealthController", () => {
  const actionHealthIndicatorResult: HealthIndicatorResult = {
    action: { status: "up" },
  };
  const albumHealthIndicatorResult: HealthIndicatorResult = {
    album: { status: "up" },
  };
  const appHealthIndicatorResult: HealthIndicatorResult = {
    app: { status: "up" },
  };
  const artistHealthIndicatorResult: HealthIndicatorResult = {
    artist: { status: "up" },
  };
  const atHealthIndicatorResult: HealthIndicatorResult = {
    at: { status: "up" },
  };
  const authHealthIndicatorResult: HealthIndicatorResult = {
    auth: { status: "up" },
  };
  const constHealthIndicatorResult: HealthIndicatorResult = {
    const: { status: "up" },
  };
  const dataHealthIndicatorResult: HealthIndicatorResult = {
    data: { status: "up" },
  };
  const fileHealthIndicatorResult: HealthIndicatorResult = {
    file: { status: "up" },
  };
  const jwksHealthIndicatorResult: HealthIndicatorResult = {
    jwks: { status: "up" },
  };
  const playlistHealthIndicatorResult: HealthIndicatorResult = {
    playlist: { status: "up" },
  };
  const relationHealthIndicatorResult: HealthIndicatorResult = {
    relation: { status: "up" },
  };
  const rtHealthIndicatorResult: HealthIndicatorResult = {
    rt: { status: "up" },
  };
  const searchHealthIndicatorResult: HealthIndicatorResult = {
    search: { status: "up" },
  };
  const songHealthIndicatorResult: HealthIndicatorResult = {
    song: { status: "up" },
  };
  const userHealthIndicatorResult: HealthIndicatorResult = {
    user: { status: "up" },
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
      ...dataHealthIndicatorResult,
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
      ...dataHealthIndicatorResult,
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
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve(actionHealthIndicatorResult),
  };
  const albumHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve(albumHealthIndicatorResult),
  };
  const appHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve(appHealthIndicatorResult),
  };
  const artistHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve(artistHealthIndicatorResult),
  };
  const atHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve(atHealthIndicatorResult),
  };
  const authHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve(authHealthIndicatorResult),
  };
  const constHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve(constHealthIndicatorResult),
  };
  const dataHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve(dataHealthIndicatorResult),
  };
  const fileHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve(fileHealthIndicatorResult),
  };
  const jwksHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve(jwksHealthIndicatorResult),
  };
  const playlistHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve(playlistHealthIndicatorResult),
  };
  const relationHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve(relationHealthIndicatorResult),
  };
  const rtHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve(rtHealthIndicatorResult),
  };
  const searchHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve(searchHealthIndicatorResult),
  };
  const songHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve(songHealthIndicatorResult),
  };
  const userHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve(userHealthIndicatorResult),
  };
  // TODO: interface ?
  const healthCheckServiceMock = {
    check: (): Promise<HealthCheckResult> => Promise.resolve(healthCheckResult),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppHealthController],
      providers: [
        { provide: ActionHealthIndicator, useValue: actionHealthIndicatorMock },
        { provide: AlbumHealthIndicator, useValue: albumHealthIndicatorMock },
        { provide: AppHealthIndicator, useValue: appHealthIndicatorMock },
        { provide: ArtistHealthIndicator, useValue: artistHealthIndicatorMock },
        { provide: AtHealthIndicator, useValue: atHealthIndicatorMock },
        { provide: AuthHealthIndicator, useValue: authHealthIndicatorMock },
        { provide: ConstHealthIndicator, useValue: constHealthIndicatorMock },
        { provide: DataHealthIndicator, useValue: dataHealthIndicatorMock },
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
