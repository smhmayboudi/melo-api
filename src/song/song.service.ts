import {
  HttpService,
  Injectable,
  InternalServerErrorException
} from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map } from "rxjs/operators";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { DataSongService } from "../data/data.song.service";
import { DataSongNewPodcastReqDto } from "../data/dto/req/data.song.new-podcast.req.dto";
import { DataOrderByType } from "../data/type/data.order-by.type";
import { RelationService } from "../relation/relation.service";
import { RelationEntityType } from "../relation/type/relation.entity.type";
import { RelationType } from "../relation/type/relation.type";
import { UserService } from "../user/user.service";
import { SongByIdReqDto } from "./dto/req/song.by-id.req.dto";
import { SongLanguageReqDto } from "./dto/req/song.language.req.dto";
import { SongLikeReqDto } from "./dto/req/song.like.req.dto";
import { SongLikedReqDto } from "./dto/req/song.liked.req.dto";
import { SongMoodReqDto } from "./dto/req/song.mood.req.dto";
import { SongNewReqDto } from "./dto/req/song.new.req.dto";
import { SongPodcastGenresParamReqDto } from "./dto/req/song.podcast.genres.param.req.dto";
import { SongPodcastGenresQueryReqDto } from "./dto/req/song.podcast.genres.query.req.dto";
import { SongSendTelegramReqDto } from "./dto/req/song.send-telegram.req.dto";
import { SongSimilarReqDto } from "./dto/req/song.similar.req.dto";
import { SongSongGenresParamReqDto } from "./dto/req/song.song.genres.param.req.dto";
import { SongSongGenresQueryReqDto } from "./dto/req/song.song.genres.query.req.dto";
import { SongTopDayReqDto } from "./dto/req/song.top-day.req.dto";
import { SongTopWeekReqDto } from "./dto/req/song.top-week.req.dto";
import { SongUnlikeReqDto } from "./dto/req/song.unlike.req.dto";
import { SongPaginationResDto } from "./dto/res/song.pagination.res.dto";
import { SongSongResDto } from "./dto/res/song.song.res.dto";
import { SongConfigService } from "./song.config.service";
import { songConstant } from "./song.constant";
import { SongOrderByType } from "./type/song.order-by.type";

@Injectable()
export class SongService {
  constructor(
    private readonly dataSongService: DataSongService,
    private readonly httpService: HttpService,
    private readonly relationService: RelationService,
    private readonly songConfigService: SongConfigService,
    private readonly userService: UserService
  ) {}

  // TODO: mixSongs
  async byId(dto: SongByIdReqDto, id: number): Promise<SongSongResDto> {
    return (this.dataSongService.byId({ ...dto, id }) as unknown) as Promise<
      SongSongResDto
    >;
  }

  // TODO: mixSongs
  async genre(
    paramDto: SongSongGenresParamReqDto,
    orderBy: SongOrderByType,
    queryDto: SongSongGenresQueryReqDto
  ): Promise<SongPaginationResDto<SongSongResDto>> {
    return (this.dataSongService.genre({
      ...paramDto,
      ...{ orderBy: (orderBy as unknown) as DataOrderByType },
      ...queryDto
    }) as unknown) as Promise<SongPaginationResDto<SongSongResDto>>;
  }

  // TODO: mixSongs
  async language(
    dto: SongLanguageReqDto,
    orderBy: SongOrderByType
  ): Promise<SongPaginationResDto<SongSongResDto>> {
    return (this.dataSongService.language({
      ...dto,
      ...{ orderBy: (orderBy as unknown) as DataOrderByType }
    }) as unknown) as Promise<SongPaginationResDto<SongSongResDto>>;
  }

  async like(
    _dto: SongLikeReqDto,
    id: number,
    sub: number
  ): Promise<DataSongResDto> {
    const song = this.dataSongService.byId({ id });
    const set = await this.relationService.set({
      createdAt: new Date(),
      from: {
        id: sub,
        type: RelationEntityType.user
      },
      to: {
        id,
        type: RelationEntityType.song
      },
      relationType: RelationType.likedSongs
    });
    if (set === false) {
      throw new InternalServerErrorException(
        songConstant.errors.service.somethingWentWrong
      );
    }
    return song;
  }

  // TODO: mixSongs
  async liked(
    dto: SongLikedReqDto,
    sub: number
  ): Promise<SongPaginationResDto<SongSongResDto>> {
    const entityDtos = await this.relationService.get({
      from: dto.from,
      fromEntityDto: {
        id: sub,
        type: RelationEntityType.user
      },
      limit: dto.limit,
      relationType: RelationType.likedSongs
    });
    return (this.dataSongService.byIds({
      ids: entityDtos.results.map(value => value.id)
    }) as unknown) as Promise<SongPaginationResDto<SongSongResDto>>;
  }

  // TODO: mixSongs
  async mood(
    dto: SongMoodReqDto
  ): Promise<SongPaginationResDto<SongSongResDto>> {
    return (this.dataSongService.mood(dto) as unknown) as Promise<
      SongPaginationResDto<SongSongResDto>
    >;
  }

  // TODO: mixSongs
  async new(dto: SongNewReqDto): Promise<SongPaginationResDto<SongSongResDto>> {
    return (this.dataSongService.new(dto) as unknown) as Promise<
      SongPaginationResDto<SongSongResDto>
    >;
  }

  // TODO: mixSongs
  async newPodcast(
    dto: DataSongNewPodcastReqDto
  ): Promise<SongPaginationResDto<SongSongResDto>> {
    return (this.dataSongService.newPodcast({ ...dto }) as unknown) as Promise<
      SongPaginationResDto<SongSongResDto>
    >;
  }

  // TODO: mixSongs
  async podcast(
    paramDto: SongPodcastGenresParamReqDto,
    queryDto: SongPodcastGenresQueryReqDto,
    orderBy
  ): Promise<SongPaginationResDto<SongSongResDto>> {
    return (this.dataSongService.podcast({
      ...paramDto,
      ...queryDto,
      orderBy
    }) as unknown) as Promise<SongPaginationResDto<SongSongResDto>>;
  }

  async sendTelegram(
    _dto: SongSendTelegramReqDto,
    id: number,
    sub: number
  ): Promise<void> {
    const userEntity = await this.userService.findOneById(sub);
    if (userEntity === undefined || userEntity.telegram_id === undefined) {
      throw new Error(songConstant.errors.service.sendTelegram);
    }
    await this.httpService
      .post(this.songConfigService.sendTelegramUrl, {
        callback_query: {
          from: {
            first_name: "",
            id: userEntity.telegram_id,
            is_bot: false,
            language_code: "fa",
            username: undefined
          },
          message: {
            chat: {
              first_name: "",
              id: userEntity.telegram_id,
              type: "private",
              username: undefined
            },
            date: Math.round(new Date().getTime() / 1000)
          },
          data: `1:${id},high,0`
        },
        update_id: 0
      })
      .pipe(
        map((value: AxiosResponse<number>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  // TODO: mixSongs
  async similar(
    dto: SongSimilarReqDto,
    id: number
  ): Promise<SongPaginationResDto<SongSongResDto>> {
    return (this.dataSongService.similar({ ...dto, id }) as unknown) as Promise<
      SongPaginationResDto<SongSongResDto>
    >;
  }

  // TODO: mixSongs
  async sliderLatest(
    _sub: number
  ): Promise<SongPaginationResDto<SongSongResDto>> {
    return (this.dataSongService.sliderLatest() as unknown) as Promise<
      SongPaginationResDto<SongSongResDto>
    >;
  }

  // TODO: mixSongs
  async topDay(
    dto: SongTopDayReqDto
  ): Promise<SongPaginationResDto<SongSongResDto>> {
    return (this.dataSongService.topDay(dto) as unknown) as Promise<
      SongPaginationResDto<SongSongResDto>
    >;
  }

  // TODO: mixSongs
  async topWeek(
    dto: SongTopWeekReqDto
  ): Promise<SongPaginationResDto<SongSongResDto>> {
    return (this.dataSongService.topWeek(dto) as unknown) as Promise<
      SongPaginationResDto<SongSongResDto>
    >;
  }

  async unlike(
    _dto: SongUnlikeReqDto,
    id: number,
    sub: number
  ): Promise<DataSongResDto> {
    const song = await this.dataSongService.byId({ id });
    const remove = await this.relationService.remove({
      from: {
        id: sub,
        type: RelationEntityType.user
      },
      to: {
        id,
        type: RelationEntityType.song
      },
      relationType: RelationType.likedSongs
    });
    if (remove === false) {
      throw new Error(songConstant.errors.service.songNotFound);
    }
    return song;
  }
}
