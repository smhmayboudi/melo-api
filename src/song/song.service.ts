import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";
import { BadRequestException, HttpService, Injectable } from "@nestjs/common";

import { DataOrderByType } from "../data/data.order-by.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongNewPodcastReqDto } from "../data/dto/req/data.song.new-podcast.req.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { DataSongService } from "../data/data.song.service";
import { PromMethodCounter } from "../prom/prom.decorator";
import { RelationEntityType } from "../relation/relation.entity.type";
import { RelationService } from "../relation/relation.service";
import { RelationType } from "../relation/relation.type";
import { SongArtistSongsReqDto } from "./dto/req/song.artist-songs.req.dto";
import { SongArtistSongsTopReqDto } from "./dto/req/song.artist-songs-top.req.dto";
import { SongByIdReqDto } from "./dto/req/song.by-id.req.dto";
import { SongConfigService } from "./song.config.service";
import { SongLanguageReqDto } from "./dto/req/song.language.req.dto";
import { SongLikeReqDto } from "./dto/req/song.like.req.dto";
import { SongLikedReqDto } from "./dto/req/song.liked.req.dto";
import { SongMoodReqDto } from "./dto/req/song.mood.req.dto";
import { SongNewReqDto } from "./dto/req/song.new.req.dto";
import { SongPodcastGenresParamReqDto } from "./dto/req/song.podcast.genres.param.req.dto";
import { SongPodcastGenresQueryReqDto } from "./dto/req/song.podcast.genres.query.req.dto";
import { SongSendTelegramReqDto } from "./dto/req/song.send-telegram.req.dto";
import { SongServiceInterface } from "./song.service.interface";
import { SongSimilarReqDto } from "./dto/req/song.similar.req.dto";
import { SongSongGenresParamReqDto } from "./dto/req/song.song.genres.param.req.dto";
import { SongSongGenresQueryReqDto } from "./dto/req/song.song.genres.query.req.dto";
import { SongTopDayReqDto } from "./dto/req/song.top-day.req.dto";
import { SongTopWeekReqDto } from "./dto/req/song.top-week.req.dto";
import { SongUnlikeReqDto } from "./dto/req/song.unlike.req.dto";
import { UserService } from "../user/user.service";
import { map } from "rxjs/operators";

@Injectable()
// @PromInstanceCounter
export class SongService implements SongServiceInterface {
  constructor(
    private readonly dataSongService: DataSongService,
    private readonly httpService: HttpService,
    private readonly relationService: RelationService,
    private readonly songConfigService: SongConfigService,
    private readonly userService: UserService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async artistSongs(
    dto: SongArtistSongsReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.dataSongService.artistSongs({ ...dto, id: dto.artistId });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async artistSongsTop(
    dto: SongArtistSongsTopReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.dataSongService.artistSongsTop({
      ...dto,
      id: dto.artistId,
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async byId(dto: SongByIdReqDto): Promise<DataSongResDto> {
    return this.dataSongService.byId(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async genre(
    orderBy: DataOrderByType,
    paramDto: SongSongGenresParamReqDto,
    queryDto: SongSongGenresQueryReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.dataSongService.genre({
      ...paramDto,
      orderBy: orderBy,
      ...queryDto,
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async language(
    dto: SongLanguageReqDto,
    orderBy: DataOrderByType
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.dataSongService.language({
      ...dto,
      orderBy,
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async like(dto: SongLikeReqDto): Promise<DataSongResDto> {
    await this.relationService.set({
      createdAt: new Date(),
      from: {
        id: dto.sub,
        type: RelationEntityType.user,
      },
      relationType: RelationType.likedSongs,
      to: {
        id: dto.id,
        type: RelationEntityType.song,
      },
    });
    const song = await this.dataSongService.byId(dto);
    return { ...song, liked: true };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async liked(
    dto: SongLikedReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    const relationEntityResDto = await this.relationService.get({
      from: dto.from,
      fromEntityDto: {
        id: dto.sub,
        type: RelationEntityType.user,
      },
      relationType: RelationType.likedSongs,
      size: dto.size,
    });
    if (relationEntityResDto.results.length === 0) {
      return {
        results: [] as DataSongResDto[],
        total: 0,
      } as DataPaginationResDto<DataSongResDto>;
    }
    return this.dataSongService.byIds({
      ids: relationEntityResDto.results.map((value) => value.id),
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async mood(
    dto: SongMoodReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.dataSongService.mood(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async newPodcast(
    dto: DataSongNewPodcastReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.dataSongService.newPodcast({ ...dto });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async newSong(
    dto: SongNewReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.dataSongService.newSong(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async podcast(
    orderBy,
    paramDto: SongPodcastGenresParamReqDto,
    queryDto: SongPodcastGenresQueryReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.dataSongService.podcast({
      ...paramDto,
      ...queryDto,
      orderBy,
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async sendTelegram(dto: SongSendTelegramReqDto): Promise<void> {
    const userUserResDto = await this.userService.findOneById(dto.sub);
    if (
      userUserResDto === undefined ||
      userUserResDto.telegram_id === undefined
    ) {
      throw new BadRequestException();
    }
    await this.httpService
      .post<number>(this.songConfigService.sendTelegramUrl, {
        callback_query: {
          data: `1:${dto.id},high,0`,
          from: {
            first_name: "",
            id: userUserResDto.telegram_id,
            is_bot: false,
            language_code: "fa",
            username: undefined,
          },
          message: {
            chat: {
              first_name: "",
              id: userUserResDto.telegram_id,
              type: "private",
              username: undefined,
            },
            date: Math.round(new Date().getTime() / 1000),
          },
        },
        update_id: 0,
      })
      .pipe(map((value) => value.data))
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async similar(
    dto: SongSimilarReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.dataSongService.similar(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async slider(): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.dataSongService.slider();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async topDay(
    dto: SongTopDayReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.dataSongService.topDay(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async topWeek(
    dto: SongTopWeekReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.dataSongService.topWeek(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async unlike(dto: SongUnlikeReqDto): Promise<DataSongResDto> {
    await this.relationService.remove({
      from: {
        id: dto.sub,
        type: RelationEntityType.user,
      },
      relationType: RelationType.likedSongs,
      to: {
        id: dto.id,
        type: RelationEntityType.song,
      },
    });
    const dataSongResDto = await this.dataSongService.byId(dto);
    return { ...dataSongResDto, liked: false };
  }
}
