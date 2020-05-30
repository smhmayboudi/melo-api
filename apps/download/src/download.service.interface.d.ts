import { DownloadSongReqDto, DownloadSongResDto } from "@melo/common";

export interface DownloadServiceInterface {
  downloadedSongs(dto: DownloadSongReqDto): Promise<DownloadSongResDto[]>;
}
