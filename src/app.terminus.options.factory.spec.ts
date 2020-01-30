import { HttpService } from "@nestjs/common";
import { DNSHealthIndicator } from "@nestjs/terminus";
import { Test, TestingModule } from "@nestjs/testing";
import { ActionHealthIndicator } from "./action/action.health.indicator";
import { AlbumHealthIndicator } from "./album/album.health.indicator";
import { AppHealthIndicator } from "./app.health.indicator";
import { AppTerminusOptionsFactory } from "./app.terminus.options.factory";
import { ArtistHealthIndicator } from "./artist/artist.health.indicator";
import { AtHealthIndicator } from "./at/at.health.indicator";
import { AuthHealthIndicator } from "./auth/auth.health.indicator";
import { ConstHealthIndicator } from "./const/const.health.indicator";
import { DataHealthIndicator } from "./data/data.health.indicator";
import { FileHealthIndicator } from "./file/file.health.indicator";
import { JwksHealthIndicator } from "./jwks/jwks.health.indicator";
import { PlaylistHealthIndicator } from "./playlist/playlist.health.indicator";
import { RelationHealthIndicator } from "./relation/relation.health.indicator";
import { RtHealthIndicator } from "./rt/rt.health.indicator";
import { SearchHealthIndicator } from "./search/search.health.indicator";
import { SongHealthIndicator } from "./song/song.health.indicator";
import { UserHealthIndicator } from "./user/user.health.indicator";

describe("AppTerminusOptionsFactory", () => {
  let actionHealthIndicatorService: ActionHealthIndicator;
  let albumHealthIndicatorService: AlbumHealthIndicator;
  let appHealthIndicatorService: AppHealthIndicator;
  let artistHealthIndicatorService: ArtistHealthIndicator;
  let atHealthIndicatorService: AtHealthIndicator;
  let authHealthIndicatorService: AuthHealthIndicator;
  let constHealthIndicatorService: ConstHealthIndicator;
  let dataHealthIndicatorService: DataHealthIndicator;
  let dnsService: DNSHealthIndicator;
  let fileHealthIndicatorService: FileHealthIndicator;
  let jwksHealthIndicatorService: JwksHealthIndicator;
  let playlistHealthIndicatorService: PlaylistHealthIndicator;
  let relationHealthIndicatorService: RelationHealthIndicator;
  let rtHealthIndicatorService: RtHealthIndicator;
  let searchHealthIndicatorService: SearchHealthIndicator;
  let songHealthIndicatorService: SongHealthIndicator;
  let userHealthIndicatorService: UserHealthIndicator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActionHealthIndicator,
        AlbumHealthIndicator,
        AppHealthIndicator,
        ArtistHealthIndicator,
        AtHealthIndicator,
        AuthHealthIndicator,
        ConstHealthIndicator,
        DNSHealthIndicator,
        DataHealthIndicator,
        FileHealthIndicator,
        HttpService,
        JwksHealthIndicator,
        PlaylistHealthIndicator,
        RelationHealthIndicator,
        RtHealthIndicator,
        SearchHealthIndicator,
        SongHealthIndicator,
        UserHealthIndicator
      ]
    }).compile();

    actionHealthIndicatorService = module.get<ActionHealthIndicator>(
      ActionHealthIndicator
    );
    albumHealthIndicatorService = module.get<AlbumHealthIndicator>(
      AlbumHealthIndicator
    );
    appHealthIndicatorService = module.get<AppHealthIndicator>(
      AppHealthIndicator
    );
    artistHealthIndicatorService = module.get<ArtistHealthIndicator>(
      ArtistHealthIndicator
    );
    atHealthIndicatorService = module.get<AtHealthIndicator>(AtHealthIndicator);
    authHealthIndicatorService = module.get<AuthHealthIndicator>(
      AuthHealthIndicator
    );
    constHealthIndicatorService = module.get<ConstHealthIndicator>(
      ConstHealthIndicator
    );
    dataHealthIndicatorService = module.get<DataHealthIndicator>(
      DataHealthIndicator
    );
    dnsService = module.get<DNSHealthIndicator>(DNSHealthIndicator);
    fileHealthIndicatorService = module.get<FileHealthIndicator>(
      FileHealthIndicator
    );
    jwksHealthIndicatorService = module.get<JwksHealthIndicator>(
      JwksHealthIndicator
    );
    playlistHealthIndicatorService = module.get<PlaylistHealthIndicator>(
      PlaylistHealthIndicator
    );
    relationHealthIndicatorService = module.get<RelationHealthIndicator>(
      RelationHealthIndicator
    );
    rtHealthIndicatorService = module.get<RtHealthIndicator>(RtHealthIndicator);
    searchHealthIndicatorService = module.get<SearchHealthIndicator>(
      SearchHealthIndicator
    );
    songHealthIndicatorService = module.get<SongHealthIndicator>(
      SongHealthIndicator
    );
    userHealthIndicatorService = module.get<UserHealthIndicator>(
      UserHealthIndicator
    );
  });

  it("should be defined", () => {
    expect(
      new AppTerminusOptionsFactory(
        actionHealthIndicatorService,
        albumHealthIndicatorService,
        appHealthIndicatorService,
        artistHealthIndicatorService,
        atHealthIndicatorService,
        authHealthIndicatorService,
        constHealthIndicatorService,
        dataHealthIndicatorService,
        dnsService,
        fileHealthIndicatorService,
        jwksHealthIndicatorService,
        playlistHealthIndicatorService,
        relationHealthIndicatorService,
        rtHealthIndicatorService,
        searchHealthIndicatorService,
        songHealthIndicatorService,
        userHealthIndicatorService
      )
    ).toBeDefined();
  });
});
