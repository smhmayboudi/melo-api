import {
  DNSHealthIndicator,
  HealthIndicatorResult,
  TerminusEndpoint,
  TerminusModuleOptions,
  TerminusOptionsFactory
} from "@nestjs/terminus";

import { ActionHealthIndicator } from "../action/action.health.indicator";
import { AlbumHealthIndicator } from "../album/album.health.indicator";
import { AppHealthIndicator } from "./app.health.indicator";
import { ArtistHealthIndicator } from "../artist/artist.health.indicator";
import { AtHealthIndicator } from "../at/at.health.indicator";
import { AuthHealthIndicator } from "../auth/auth.health.indicator";
import { ConstHealthIndicator } from "../const/const.health.indicator";
import { DataHealthIndicator } from "../data/data.health.indicator";
import { FileHealthIndicator } from "../file/file.health.indicator";
import { Injectable } from "@nestjs/common";
import { JwksHealthIndicator } from "../jwks/jwks.health.indicator";
import { PATH_HEALTH } from "./app.constant";
import { PlaylistHealthIndicator } from "../playlist/playlist.health.indicator";
import { RelationHealthIndicator } from "../relation/relation.health.indicator";
import { RtHealthIndicator } from "../rt/rt.health.indicator";
import { SearchHealthIndicator } from "../search/search.health.indicator";
import { SongHealthIndicator } from "../song/song.health.indicator";
import { UserHealthIndicator } from "../user/user.health.indicator";

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
    private readonly dNSHealthIndicator: DNSHealthIndicator,
    private readonly fileHealthIndicator: FileHealthIndicator,
    private readonly jwksHealthIndicator: JwksHealthIndicator,
    private readonly playlistHealthIndicator: PlaylistHealthIndicator,
    private readonly relationHealthIndicator: RelationHealthIndicator,
    private readonly rtHealthIndicator: RtHealthIndicator,
    private readonly searchHealthIndicator: SearchHealthIndicator,
    private readonly songHealthIndicator: SongHealthIndicator,
    private readonly userHealthIndicator: UserHealthIndicator
  ) {}

  createTerminusOptions(): TerminusModuleOptions {
    const healthEndpoint: TerminusEndpoint = {
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
          this.dNSHealthIndicator.pingCheck("google", "https://google.com"),
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
          this.userHealthIndicator.isHealthy()
      ],
      url: PATH_HEALTH
    };
    return {
      endpoints: [healthEndpoint]
    };
  }
}
