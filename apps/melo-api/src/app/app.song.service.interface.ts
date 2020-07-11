import {
  AppSongLikeReqDto,
  AppSongLikesReqDto,
  AppSongLocalizeReqDto,
  SongResDto,
} from "@melo/common";

export interface AppSongServiceInterface {
  like(dto: AppSongLikeReqDto): Promise<SongResDto>;
  likes(dto: AppSongLikesReqDto): Promise<SongResDto[]>;
  localize(dto: AppSongLocalizeReqDto): Promise<SongResDto>;
}
