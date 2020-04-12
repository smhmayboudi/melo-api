/* eslint-disable @typescript-eslint/unbound-method */
import { DNSHealthIndicator, HealthIndicatorResult } from "@nestjs/terminus";
import { Test, TestingModule } from "@nestjs/testing";

import { ActionHealthIndicator } from "../action/action.health.indicator";
import { AlbumHealthIndicator } from "../album/album.health.indicator";
import { AppHealthIndicator } from "./app.health.indicator";
import { AppTerminusOptionsFactory } from "./app.terminus.options.factory";
import { ArtistHealthIndicator } from "../artist/artist.health.indicator";
import { AtHealthIndicator } from "../at/at.health.indicator";
import { AuthHealthIndicator } from "../auth/auth.health.indicator";
import { ConstHealthIndicator } from "../const/const.health.indicator";
import { DataHealthIndicator } from "../data/data.health.indicator";
import { FileHealthIndicator } from "../file/file.health.indicator";
import { HealthIndicatorInterface } from "./app.module.interface";
import { JwksHealthIndicator } from "../jwks/jwks.health.indicator";
import { PlaylistHealthIndicator } from "../playlist/playlist.health.indicator";
import { RelationHealthIndicator } from "../relation/relation.health.indicator";
import { RtHealthIndicator } from "../rt/rt.health.indicator";
import { SearchHealthIndicator } from "../search/search.health.indicator";
import { SongHealthIndicator } from "../song/song.health.indicator";
import { UserHealthIndicator } from "../user/user.health.indicator";

describe("AppTerminusOptionsFactory", () => {
  const actionHealthIndicatorMock: HealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve({
        action: {
          status: "up",
        },
      }),
  };
  const albumHealthIndicatorMock: HealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve({
        album: {
          status: "up",
        },
      }),
  };
  const appHealthIndicatorMock: HealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve({
        app: {
          status: "up",
        },
      }),
  };
  const artistHealthIndicatorMock: HealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve({
        artist: {
          status: "up",
        },
      }),
  };
  const atHealthIndicatorMock: HealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve({
        at: {
          status: "up",
        },
      }),
  };
  const authHealthIndicatorMock: HealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve({
        auth: {
          status: "up",
        },
      }),
  };
  const constHealthIndicatorMock: HealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve({
        const: {
          status: "up",
        },
      }),
  };
  const dataHealthIndicatorMock: HealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve({
        data: {
          status: "up",
        },
      }),
  };
  const dNSHealthIndicatorMock: HealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve({
        dns: {
          status: "up",
        },
      }),
  };
  const fileHealthIndicatorMock: HealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve({
        file: {
          status: "up",
        },
      }),
  };
  const jwksHealthIndicatorMock: HealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve({
        jwks: {
          status: "up",
        },
      }),
  };
  const playlistHealthIndicatorMock: HealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve({
        playlist: {
          status: "up",
        },
      }),
  };
  const relationHealthIndicatorMock: HealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve({
        relation: {
          status: "up",
        },
      }),
  };
  const rtHealthIndicatorMock: HealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve({
        rt: {
          status: "up",
        },
      }),
  };
  const searchHealthIndicatorMock: HealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve({
        search: {
          status: "up",
        },
      }),
  };
  const songHealthIndicatorMock: HealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve({
        song: {
          status: "up",
        },
      }),
  };
  const userHealthIndicatorMock: HealthIndicatorInterface = {
    isHealthy: (): Promise<HealthIndicatorResult> =>
      Promise.resolve({
        user: {
          status: "up",
        },
      }),
  };

  let actionHealthIndicator: ActionHealthIndicator;
  let albumHealthIndicator: AlbumHealthIndicator;
  let appHealthIndicator: AppHealthIndicator;
  let artistHealthIndicator: ArtistHealthIndicator;
  let atHealthIndicator: AtHealthIndicator;
  let authHealthIndicator: AuthHealthIndicator;
  let constHealthIndicator: ConstHealthIndicator;
  let dataHealthIndicator: DataHealthIndicator;
  let dNSHealthIndicator: DNSHealthIndicator;
  let fileHealthIndicator: FileHealthIndicator;
  let jwksHealthIndicator: JwksHealthIndicator;
  let playlistHealthIndicator: PlaylistHealthIndicator;
  let relationHealthIndicator: RelationHealthIndicator;
  let rtHealthIndicator: RtHealthIndicator;
  let searchHealthIndicator: SearchHealthIndicator;
  let songHealthIndicator: SongHealthIndicator;
  let userHealthIndicator: UserHealthIndicator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: ActionHealthIndicator, useValue: actionHealthIndicatorMock },
        { provide: AlbumHealthIndicator, useValue: albumHealthIndicatorMock },
        { provide: AppHealthIndicator, useValue: appHealthIndicatorMock },
        { provide: ArtistHealthIndicator, useValue: artistHealthIndicatorMock },
        { provide: AtHealthIndicator, useValue: atHealthIndicatorMock },
        { provide: AuthHealthIndicator, useValue: authHealthIndicatorMock },
        { provide: ConstHealthIndicator, useValue: constHealthIndicatorMock },
        { provide: DataHealthIndicator, useValue: dataHealthIndicatorMock },
        { provide: DNSHealthIndicator, useValue: dNSHealthIndicatorMock },
        { provide: FileHealthIndicator, useValue: fileHealthIndicatorMock },
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
    actionHealthIndicator = module.get<ActionHealthIndicator>(
      ActionHealthIndicator
    );
    albumHealthIndicator = module.get<AlbumHealthIndicator>(
      AlbumHealthIndicator
    );
    appHealthIndicator = module.get<AppHealthIndicator>(AppHealthIndicator);
    artistHealthIndicator = module.get<ArtistHealthIndicator>(
      ArtistHealthIndicator
    );
    atHealthIndicator = module.get<AtHealthIndicator>(AtHealthIndicator);
    authHealthIndicator = module.get<AuthHealthIndicator>(AuthHealthIndicator);
    constHealthIndicator = module.get<ConstHealthIndicator>(
      ConstHealthIndicator
    );
    dataHealthIndicator = module.get<DataHealthIndicator>(DataHealthIndicator);
    dNSHealthIndicator = module.get<DNSHealthIndicator>(DNSHealthIndicator);
    fileHealthIndicator = module.get<FileHealthIndicator>(FileHealthIndicator);
    jwksHealthIndicator = module.get<JwksHealthIndicator>(JwksHealthIndicator);
    playlistHealthIndicator = module.get<PlaylistHealthIndicator>(
      PlaylistHealthIndicator
    );
    relationHealthIndicator = module.get<RelationHealthIndicator>(
      RelationHealthIndicator
    );
    rtHealthIndicator = module.get<RtHealthIndicator>(RtHealthIndicator);
    searchHealthIndicator = module.get<SearchHealthIndicator>(
      SearchHealthIndicator
    );
    songHealthIndicator = module.get<SongHealthIndicator>(SongHealthIndicator);
    userHealthIndicator = module.get<UserHealthIndicator>(UserHealthIndicator);
  });

  it("should be defined", () => {
    expect(
      new AppTerminusOptionsFactory(
        actionHealthIndicator,
        albumHealthIndicator,
        appHealthIndicator,
        artistHealthIndicator,
        atHealthIndicator,
        authHealthIndicator,
        constHealthIndicator,
        dataHealthIndicator,
        dNSHealthIndicator,
        fileHealthIndicator,
        jwksHealthIndicator,
        playlistHealthIndicator,
        relationHealthIndicator,
        rtHealthIndicator,
        searchHealthIndicator,
        songHealthIndicator,
        userHealthIndicator
      )
    ).toBeDefined();
  });

  it("createTerminusOptions should be equal to a value", () => {
    expect(
      JSON.stringify(
        new AppTerminusOptionsFactory(
          actionHealthIndicator,
          albumHealthIndicator,
          appHealthIndicator,
          artistHealthIndicator,
          atHealthIndicator,
          authHealthIndicator,
          constHealthIndicator,
          dataHealthIndicator,
          dNSHealthIndicator,
          fileHealthIndicator,
          jwksHealthIndicator,
          playlistHealthIndicator,
          relationHealthIndicator,
          rtHealthIndicator,
          searchHealthIndicator,
          songHealthIndicator,
          userHealthIndicator
        ).createTerminusOptions()
      )
    ).toEqual(
      JSON.stringify({
        endpoints: [
          {
            healthIndicators: [
              (): Promise<HealthIndicatorResult> =>
                actionHealthIndicatorMock.isHealthy(),
              (): Promise<HealthIndicatorResult> =>
                albumHealthIndicatorMock.isHealthy(),
              (): Promise<HealthIndicatorResult> =>
                appHealthIndicatorMock.isHealthy(),
              (): Promise<HealthIndicatorResult> =>
                artistHealthIndicatorMock.isHealthy(),
              (): Promise<HealthIndicatorResult> =>
                atHealthIndicatorMock.isHealthy(),
              (): Promise<HealthIndicatorResult> =>
                authHealthIndicatorMock.isHealthy(),
              (): Promise<HealthIndicatorResult> =>
                constHealthIndicatorMock.isHealthy(),
              (): Promise<HealthIndicatorResult> =>
                dataHealthIndicatorMock.isHealthy(),
              (): Promise<HealthIndicatorResult> =>
                dNSHealthIndicatorMock.isHealthy(),
              (): Promise<HealthIndicatorResult> =>
                fileHealthIndicatorMock.isHealthy(),
              (): Promise<HealthIndicatorResult> =>
                jwksHealthIndicatorMock.isHealthy(),
              (): Promise<HealthIndicatorResult> =>
                playlistHealthIndicatorMock.isHealthy(),
              (): Promise<HealthIndicatorResult> =>
                relationHealthIndicatorMock.isHealthy(),
              (): Promise<HealthIndicatorResult> =>
                rtHealthIndicatorMock.isHealthy(),
              (): Promise<HealthIndicatorResult> =>
                searchHealthIndicatorMock.isHealthy(),
              (): Promise<HealthIndicatorResult> =>
                songHealthIndicatorMock.isHealthy(),
              (): Promise<HealthIndicatorResult> =>
                userHealthIndicatorMock.isHealthy(),
            ],
            url: "/health",
          },
        ],
      })
    );
  });

  it.todo("call isHealthys");
});
