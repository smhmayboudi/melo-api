import { BadRequestException, HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map } from "rxjs/operators";
import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";
import { AppMixSongService } from "../app/app.mix-song.service";
import { DataOrderByType } from "../data/data.order-by.type";
import { DataSongService } from "../data/data.song.service";
import { DataSongNewPodcastReqDto } from "../data/dto/req/data.song.new-podcast.req.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import {
  // PromInstanceCounter,
  PromMethodCounter
} from "../prom/prom.decorator";
import { RelationEntityType } from "../relation/relation.entity.type";
import { RelationService } from "../relation/relation.service";
import { RelationType } from "../relation/relation.type";
import { UserService } from "../user/user.service";
import { SongArtistSongsTopReqDto } from "./dto/req/song.artist-songs-top.req.dto";
import { SongArtistSongsReqDto } from "./dto/req/song.artist-songs.req.dto";
import { SongByIdReqDto } from "./dto/req/song.by-id.req.dto";
import { SongLanguageReqDto } from "./dto/req/song.language.req.dto";
import { SongLikeReqDto } from "./dto/req/song.like.req.dto";
import { SongLikedReqDto } from "./dto/req/song.liked.req.dto";
import { SongMoodReqDto } from "./dto/req/song.mood.req.dto";
import { SongNewReqDto } from "./dto/req/song.new.req.dto";
import { SongPodcastGenresParamReqDto } from "./dto/req/song.podcast.genres.param.req.dto";
import { SongPodcastGenresQueryReqDto } from "./dto/req/song.podcast.genres.query.req.dto";
import { SongSearchMoodParamDto } from "./dto/req/song.search-mood.param.req.dto";
import { SongSearchMoodQueryDto } from "./dto/req/song.search-mood.query.req.dto";
import { SongSendTelegramReqDto } from "./dto/req/song.send-telegram.req.dto";
import { SongSimilarReqDto } from "./dto/req/song.similar.req.dto";
import { SongSongGenresParamReqDto } from "./dto/req/song.song.genres.param.req.dto";
import { SongSongGenresQueryReqDto } from "./dto/req/song.song.genres.query.req.dto";
import { SongTopDayReqDto } from "./dto/req/song.top-day.req.dto";
import { SongTopWeekReqDto } from "./dto/req/song.top-week.req.dto";
import { SongUnlikeReqDto } from "./dto/req/song.unlike.req.dto";
import { SongConfigService } from "./song.config.service";
import { SongServiceInterface } from "./song.service.interface";

@Injectable()
// @PromInstanceCounter
export class SongService implements SongServiceInterface {
  constructor(
    private readonly appMixSongService: AppMixSongService,
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
    dto: SongArtistSongsReqDto,
    artistId: number,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    const dataSongResDto = await this.dataSongService.artistSongs({
      ...dto,
      id: artistId.toString()
    });
    const songMixResDto = await this.appMixSongService.mixSong(
      sub,
      dataSongResDto.results
    );
    return {
      results: songMixResDto,
      total: songMixResDto.length
    } as DataPaginationResDto<DataSongResDto>;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async artistSongsTop(
    dto: SongArtistSongsTopReqDto,
    artistId: number,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    const dataSongResDto = await this.dataSongService.artistSongsTop({
      ...dto,
      id: artistId.toString()
    });
    const songMixResDto = await this.appMixSongService.mixSong(
      sub,
      dataSongResDto.results
    );
    return {
      results: songMixResDto,
      total: songMixResDto.length
    } as DataPaginationResDto<DataSongResDto>;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async byId(
    dto: SongByIdReqDto,
    id: number,
    sub: number
  ): Promise<DataSongResDto> {
    const dataSongResDto = await this.dataSongService.byId({ ...dto, id });
    const songMixResDto = await this.appMixSongService.mixSong(sub, [
      dataSongResDto
    ]);
    return songMixResDto[0];
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async genre(
    paramDto: SongSongGenresParamReqDto,
    orderBy: DataOrderByType,
    queryDto: SongSongGenresQueryReqDto,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    const dataSongResDto = await this.dataSongService.genre({
      ...paramDto,
      orderBy: orderBy,
      ...queryDto
    });
    const songMixResDto = await this.appMixSongService.mixSong(
      sub,
      dataSongResDto.results
    );
    return {
      results: songMixResDto,
      total: songMixResDto.length
    } as DataPaginationResDto<DataSongResDto>;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async language(
    dto: SongLanguageReqDto,
    orderBy: DataOrderByType,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    const dataSongResDto = await this.dataSongService.language({
      ...dto,
      orderBy
    });
    const songMixResDto = await this.appMixSongService.mixSong(
      sub,
      dataSongResDto.results
    );
    return {
      results: songMixResDto,
      total: songMixResDto.length
    } as DataPaginationResDto<DataSongResDto>;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async like(
    _dto: SongLikeReqDto,
    id: number,
    sub: number
  ): Promise<DataSongResDto> {
    const song = await this.dataSongService.byId({ id });
    await this.relationService.set({
      createdAt: new Date(),
      from: {
        id: sub.toString(),
        type: RelationEntityType.user
      },
      to: {
        id: id.toString(),
        type: RelationEntityType.song
      },
      relationType: RelationType.likedSongs
    });
    return { ...song, liked: true };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async liked(
    dto: SongLikedReqDto,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    const relationEntityResDto = await this.relationService.get({
      from: dto.from,
      fromEntityDto: {
        id: sub.toString(),
        type: RelationEntityType.user
      },
      limit: dto.limit,
      relationType: RelationType.likedSongs
    });
    if (relationEntityResDto.results.length === 0) {
      return ({
        results: [],
        total: 0
      } as unknown) as DataPaginationResDto<DataSongResDto>;
    }
    const dataSongResDto = await this.dataSongService.byIds({
      ids: relationEntityResDto.results.map(value => value.id)
    });
    const songMixResDto = await this.appMixSongService.mixSong(
      sub,
      dataSongResDto.results
    );
    return {
      results: songMixResDto,
      total: songMixResDto.length
    } as DataPaginationResDto<DataSongResDto>;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async mood(
    dto: SongMoodReqDto,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    const dataSongResDto = await this.dataSongService.mood(dto);
    const songMixResDto = await this.appMixSongService.mixSong(
      sub,
      dataSongResDto.results
    );
    return {
      results: songMixResDto,
      total: songMixResDto.length
    } as DataPaginationResDto<DataSongResDto>;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async newPodcast(
    dto: DataSongNewPodcastReqDto,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    const dataSongResDto = await this.dataSongService.newPodcast({ ...dto });
    const songMixResDto = await this.appMixSongService.mixSong(
      sub,
      dataSongResDto.results
    );
    return {
      results: songMixResDto,
      total: songMixResDto.length
    } as DataPaginationResDto<DataSongResDto>;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async newSong(
    dto: SongNewReqDto,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    const dataSongResDto = await this.dataSongService.newSong(dto);
    const songMixResDto = await this.appMixSongService.mixSong(
      sub,
      dataSongResDto.results
    );
    return {
      results: songMixResDto,
      total: songMixResDto.length
    } as DataPaginationResDto<DataSongResDto>;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async podcast(
    paramDto: SongPodcastGenresParamReqDto,
    queryDto: SongPodcastGenresQueryReqDto,
    orderBy,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    const dataSongResDto = await this.dataSongService.podcast({
      ...paramDto,
      ...queryDto,
      orderBy
    });
    const songMixResDto = await this.appMixSongService.mixSong(
      sub,
      dataSongResDto.results
    );
    return {
      results: songMixResDto,
      total: songMixResDto.length
    } as DataPaginationResDto<DataSongResDto>;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async searchMood(
    paramDto: SongSearchMoodParamDto,
    querydto: SongSearchMoodQueryDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.dataSongService.searchMood({
      ...paramDto,
      ...querydto
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async sendTelegram(
    _dto: SongSendTelegramReqDto,
    id: number,
    sub: number
  ): Promise<void> {
    const userUserResDto = await this.userService.findOneById(sub);
    if (
      userUserResDto === undefined ||
      userUserResDto.telegram_id === undefined
    ) {
      throw new BadRequestException();
    }
    await this.httpService
      .post(this.songConfigService.sendTelegramUrl, {
        callback_query: {
          from: {
            first_name: "",
            id: userUserResDto.telegram_id,
            is_bot: false,
            language_code: "fa",
            username: undefined
          },
          message: {
            chat: {
              first_name: "",
              id: userUserResDto.telegram_id,
              type: "private",
              username: undefined
            },
            date: Math.round(new Date().getTime() / 1000)
          },
          data: `1:${id},high,0`
        },
        update_id: 0
      })
      .pipe(map((value: AxiosResponse<number>) => value.data))
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async similar(
    dto: SongSimilarReqDto,
    id: number,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    const dataSongResDto = await this.dataSongService.similar({ ...dto, id });
    const songMixResDto = await this.appMixSongService.mixSong(
      sub,
      dataSongResDto.results
    );
    return {
      results: songMixResDto,
      total: songMixResDto.length
    } as DataPaginationResDto<DataSongResDto>;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async slider(sub: number): Promise<DataPaginationResDto<DataSongResDto>> {
    const dataSongResDto = await this.dataSongService.slider();
    const songMixResDto = await this.appMixSongService.mixSong(
      sub,
      dataSongResDto.results
    );
    return {
      results: songMixResDto,
      total: songMixResDto.length
    } as DataPaginationResDto<DataSongResDto>;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async topDay(
    dto: SongTopDayReqDto,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    const dataSongResDto = await this.dataSongService.topDay(dto);
    const songMixResDto = await this.appMixSongService.mixSong(
      sub,
      dataSongResDto.results
    );
    return {
      results: songMixResDto,
      total: songMixResDto.length
    } as DataPaginationResDto<DataSongResDto>;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async topWeek(
    dto: SongTopWeekReqDto,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    const dataSongResDto = await this.dataSongService.topWeek(dto);
    const songMixResDto = await this.appMixSongService.mixSong(
      sub,
      dataSongResDto.results
    );
    return {
      results: songMixResDto,
      total: songMixResDto.length
    } as DataPaginationResDto<DataSongResDto>;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async unlike(
    _dto: SongUnlikeReqDto,
    id: number,
    sub: number
  ): Promise<DataSongResDto> {
    const dataSongResDto = await this.dataSongService.byId({ id });
    await this.relationService.remove({
      from: {
        id: sub.toString(),
        type: RelationEntityType.user
      },
      to: {
        id: id.toString(),
        type: RelationEntityType.song
      },
      relationType: RelationType.likedSongs
    });
    return { ...dataSongResDto, liked: false };
  }
}
