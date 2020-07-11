import {
  AppArtistFollowReqDto,
  AppArtistFollowsReqDto,
  ArtistResDto,
} from "@melo/common";

export interface AppArtistServiceInterface {
  follow(dto: AppArtistFollowReqDto): Promise<ArtistResDto>;
  follows(dto: AppArtistFollowsReqDto): Promise<ArtistResDto[]>;
}
