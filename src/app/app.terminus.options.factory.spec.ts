import { DNSHealthIndicator, TerminusModule } from "@nestjs/terminus";
import { Test, TestingModule } from "@nestjs/testing";
import { ActionHealthIndicator } from "../action/action.health.indicator";
import { ActionModule } from "../action/action.module";
import { AlbumHealthIndicator } from "../album/album.health.indicator";
import { AlbumModule } from "../album/album.module";
import { AppHealthIndicator } from "./app.health.indicator";
import { AppModule } from "./app.module";
import { AppTerminusOptionsFactory } from "./app.terminus.options.factory";
import { ArtistHealthIndicator } from "../artist/artist.health.indicator";
import { ArtistModule } from "../artist/artist.module";
import { AtHealthIndicator } from "../at/at.health.indicator";
import { AtModule } from "../at/at.module";
import { AuthHealthIndicator } from "../auth/auth.health.indicator";
import { AuthModule } from "../auth/auth.module";
import { ConstHealthIndicator } from "../const/const.health.indicator";
import { ConstModule } from "../const/const.module";
import { DataHealthIndicator } from "../data/data.health.indicator";
import { DataModule } from "../data/data.module";
import { FileHealthIndicator } from "../file/file.health.indicator";
import { FileModule } from "../file/file.module";
import { JwksHealthIndicator } from "../jwks/jwks.health.indicator";
import { JwksModule } from "../jwks/jwks.module";
import { PlaylistHealthIndicator } from "../playlist/playlist.health.indicator";
import { PlaylistModule } from "../playlist/playlist.module";
import { RelationHealthIndicator } from "../relation/relation.health.indicator";
import { RelationModule } from "../relation/relation.module";
import { RtHealthIndicator } from "../rt/rt.health.indicator";
import { RtModule } from "../rt/rt.module";
import { SearchHealthIndicator } from "../search/search.health.indicator";
import { SearchModule } from "../search/search.module";
import { SongHealthIndicator } from "../song/song.health.indicator";
import { SongModule } from "../song/song.module";
import { UserHealthIndicator } from "../user/user.health.indicator";
import { UserModule } from "../user/user.module";

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
      imports: [
        TerminusModule.forRootAsync({
          imports: [
            ActionModule,
            AlbumModule,
            AppModule,
            ArtistModule,
            AtModule,
            AuthModule,
            ConstModule,
            DataModule,
            FileModule,
            JwksModule,
            PlaylistModule,
            RelationModule,
            RtModule,
            SearchModule,
            SongModule,
            UserModule
          ],
          useClass: AppTerminusOptionsFactory
        })
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
