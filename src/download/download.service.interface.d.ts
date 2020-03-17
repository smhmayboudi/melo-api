import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DownloadOrderByType } from "./download.order-by.type";
import { DownloadSongParamReqDto } from "./dto/req/download.song.param.req.dto";
import { DownloadSongQueryReqDto } from "./dto/req/download.song.query.req.dto";
import { DownloadSongResDto } from "./dto/res/download.song.res.dto";
import { DownloadSortByType } from "./download.sort-by.type";

export interface DownloadServiceInterface {
  downloadedSongs(
    paramDto: DownloadSongParamReqDto,
    queryDto: DownloadSongQueryReqDto,
    orderBy: DownloadOrderByType,
    sortBy: DownloadSortByType,
    sub: number
  ): Promise<DataPaginationResDto<DownloadSongResDto>>;
}
