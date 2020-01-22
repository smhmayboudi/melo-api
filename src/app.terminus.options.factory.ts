import { Injectable } from "@nestjs/common";
import {
  DNSHealthIndicator,
  HealthIndicatorResult,
  TerminusEndpoint,
  TerminusModuleOptions,
  TerminusOptionsFactory
} from "@nestjs/terminus";
import { ActionHealthIndicator } from "./action/action.health";
import { AlbumHealthIndicator } from "./album/album.health";
import { AppHealthIndicator } from "./app.health";
import { ArtistHealthIndicator } from "./artist/artist.health";
import { AtHealthIndicator } from "./at/at.health";
import { AuthHealthIndicator } from "./auth/auth.health";
import { ConstHealthIndicator } from "./const/const.health";
import { DataHealthIndicator } from "./data/data.health";
import { FileHealthIndicator } from "./file/file.health";
import { JwksHealthIndicator } from "./jwks/jwks.health";
import { PlaylistHealthIndicator } from "./playlist/playlist.health";
import { RelationHealthIndicator } from "./relation/relation.health";
import { RtHealthIndicator } from "./rt/rt.health";
import { SearchHealthIndicator } from "./search/search.health";
import { SongHealthIndicator } from "./song/song.health";
import { TelegramHealthIndicator } from "./telegram/telegram.health";
import { UserHealthIndicator } from "./user/user.health";

@Injectable()
export class AppTerminusOptionsFactory implements TerminusOptionsFactory {
  constructor(
    private readonly actionHealthIndicator: ActionHealthIndicator,
    private readonly albumHealthIndicator: AlbumHealthIndicator,
    private readonly appHealthIndicator: AppHealthIndicator,
    private readonly artistHealthIndicator: ArtistHealthIndicator,
    private readonly atHealthIndicator: AtHealthIndicator,
    private readonly authHealthIndicator: AuthHealthIndicator,
    private readonly constHealthIndicator: ConstHealthIndicator,
    private readonly dataHealthIndicator: DataHealthIndicator,
    private readonly dns: DNSHealthIndicator,
    private readonly fileHealthIndicator: FileHealthIndicator,
    private readonly jwksHealthIndicator: JwksHealthIndicator,
    private readonly playlistHealthIndicator: PlaylistHealthIndicator,
    private readonly relationHealthIndicator: RelationHealthIndicator,
    private readonly rtHealthIndicator: RtHealthIndicator,
    private readonly searchHealthIndicator: SearchHealthIndicator,
    private readonly songHealthIndicator: SongHealthIndicator,
    private readonly telegramHealthIndicator: TelegramHealthIndicator,
    private readonly userHealthIndicator: UserHealthIndicator
  ) {}

  createTerminusOptions(): TerminusModuleOptions {
    const healthEndpoint: TerminusEndpoint = {
      url: "/health",
      healthIndicators: [
        async (): Promise<HealthIndicatorResult> =>
          this.actionHealthIndicator.isHealthy(),
        async (): Promise<HealthIndicatorResult> =>
          this.albumHealthIndicator.isHealthy(),
        async (): Promise<HealthIndicatorResult> =>
          this.appHealthIndicator.isHealthy(),
        async (): Promise<HealthIndicatorResult> =>
          this.artistHealthIndicator.isHealthy(),
        async (): Promise<HealthIndicatorResult> =>
          this.atHealthIndicator.isHealthy(),
        async (): Promise<HealthIndicatorResult> =>
          this.authHealthIndicator.isHealthy(),
        async (): Promise<HealthIndicatorResult> =>
          this.constHealthIndicator.isHealthy(),
        async (): Promise<HealthIndicatorResult> =>
          this.dataHealthIndicator.isHealthy(),
        async (): Promise<HealthIndicatorResult> =>
          this.dns.pingCheck("google", "https://google.com"),
        async (): Promise<HealthIndicatorResult> =>
          this.fileHealthIndicator.isHealthy(),
        async (): Promise<HealthIndicatorResult> =>
          this.jwksHealthIndicator.isHealthy(),
        async (): Promise<HealthIndicatorResult> =>
          this.playlistHealthIndicator.isHealthy(),
        async (): Promise<HealthIndicatorResult> =>
          this.relationHealthIndicator.isHealthy(),
        async (): Promise<HealthIndicatorResult> =>
          this.rtHealthIndicator.isHealthy(),
        async (): Promise<HealthIndicatorResult> =>
          this.searchHealthIndicator.isHealthy(),
        async (): Promise<HealthIndicatorResult> =>
          this.songHealthIndicator.isHealthy(),
        async (): Promise<HealthIndicatorResult> =>
          this.telegramHealthIndicator.isHealthy(),
        async (): Promise<HealthIndicatorResult> =>
          this.userHealthIndicator.isHealthy()
      ]
    };
    return {
      endpoints: [healthEndpoint]
    };
  }
}
