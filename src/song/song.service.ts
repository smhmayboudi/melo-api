import { CounterMetric, InjectCounterMetric } from "@digikare/nestjs-prom";
import {
  BadRequestException,
  HttpService,
  Injectable,
  InternalServerErrorException
} from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map } from "rxjs/operators";
import { AppMixSongService } from "../app.mix-song.service";
import { DataSongService } from "../data/data.song.service";
import { DataSongNewPodcastReqDto } from "../data/dto/req/data.song.new-podcast.req.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { DataOrderByType } from "../data/type/data.order-by.type";
import { RelationService } from "../relation/relation.service";
import { RelationEntityType } from "../relation/type/relation.entity.type";
import { RelationType } from "../relation/type/relation.type";
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
import { SongModule } from "./song.module";

@Injectable()
export class SongService {
  constructor(
    private readonly appMixSongService: AppMixSongService,
    @InjectCounterMetric("song_counter")
    private readonly counterMetric: CounterMetric,
    private readonly dataSongService: DataSongService,
    private readonly httpService: HttpService,
    private readonly relationService: RelationService,
    private readonly songConfigService: SongConfigService,
    private readonly userService: UserService
  ) {}

  async artistSongs(
    dto: SongArtistSongsReqDto,
    artistId: number,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    this.counterMetric.inc({
      module: SongModule.name,
      service: SongService.name,
      function: this.artistSongs.name
    });
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

  async artistSongsTop(
    dto: SongArtistSongsTopReqDto,
    artistId: number,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    this.counterMetric.inc({
      module: SongModule.name,
      service: SongService.name,
      function: this.artistSongsTop.name
    });
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

  async byId(
    dto: SongByIdReqDto,
    id: number,
    sub: number
  ): Promise<DataSongResDto> {
    this.counterMetric.inc({
      module: SongModule.name,
      service: SongService.name,
      function: this.byId.name
    });
    const dataSongResDto = await this.dataSongService.byId({ ...dto, id });
    const songMixResDto = await this.appMixSongService.mixSong(sub, [
      dataSongResDto
    ]);
    return songMixResDto[0];
  }

  async genre(
    paramDto: SongSongGenresParamReqDto,
    orderBy: DataOrderByType,
    queryDto: SongSongGenresQueryReqDto,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    this.counterMetric.inc({
      module: SongModule.name,
      service: SongService.name,
      function: this.genre.name
    });
    const dataSongResDto = await this.dataSongService.genre({
      ...paramDto,
      orderBy: orderBy,
      ...queryDto
    });
    const songMixResDto = await this.appMixSongService.mixSong(
      sub,
      dataSongResDto.results
    );
    console.log("LOG: ", songMixResDto);

    return {
      results: songMixResDto,
      total: songMixResDto.length
    } as DataPaginationResDto<DataSongResDto>;
  }

  async language(
    dto: SongLanguageReqDto,
    orderBy: DataOrderByType,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    this.counterMetric.inc({
      module: SongModule.name,
      service: SongService.name,
      function: this.language.name
    });
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

  async like(
    _dto: SongLikeReqDto,
    id: number,
    sub: number
  ): Promise<DataSongResDto> {
    this.counterMetric.inc({
      module: SongModule.name,
      service: SongService.name,
      function: this.like.name
    });
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

  async liked(
    dto: SongLikedReqDto,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    this.counterMetric.inc({
      module: SongModule.name,
      service: SongService.name,
      function: this.liked.name
    });
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
      throw new InternalServerErrorException();
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

  async mood(
    dto: SongMoodReqDto,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    this.counterMetric.inc({
      module: SongModule.name,
      service: SongService.name,
      function: this.mood.name
    });
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

  async new(
    dto: SongNewReqDto,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    this.counterMetric.inc({
      module: SongModule.name,
      service: SongService.name,
      function: this.new.name
    });
    const dataSongResDto = await this.dataSongService.new(dto);
    const songMixResDto = await this.appMixSongService.mixSong(
      sub,
      dataSongResDto.results
    );
    return {
      results: songMixResDto,
      total: songMixResDto.length
    } as DataPaginationResDto<DataSongResDto>;
  }

  async newPodcast(
    dto: DataSongNewPodcastReqDto,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    this.counterMetric.inc({
      module: SongModule.name,
      service: SongService.name,
      function: this.newPodcast.name
    });
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

  async podcast(
    paramDto: SongPodcastGenresParamReqDto,
    queryDto: SongPodcastGenresQueryReqDto,
    orderBy,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    this.counterMetric.inc({
      module: SongModule.name,
      service: SongService.name,
      function: this.podcast.name
    });
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

  async searchMood(
    paramDto: SongSearchMoodParamDto,
    querydto: SongSearchMoodQueryDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    this.counterMetric.inc({
      module: SongModule.name,
      service: SongService.name,
      function: this.searchMood.name
    });
    return this.dataSongService.searchMood({
      ...paramDto,
      ...querydto
    });
  }

  async sendTelegram(
    _dto: SongSendTelegramReqDto,
    id: number,
    sub: number
  ): Promise<void> {
    this.counterMetric.inc({
      module: SongModule.name,
      service: SongService.name,
      function: this.sendTelegram.name
    });
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

  async similar(
    dto: SongSimilarReqDto,
    id: number,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    this.counterMetric.inc({
      module: SongModule.name,
      service: SongService.name,
      function: this.similar.name
    });
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

  async slider(sub: number): Promise<DataPaginationResDto<DataSongResDto>> {
    this.counterMetric.inc({
      module: SongModule.name,
      service: SongService.name,
      function: this.slider.name
    });
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

  async topDay(
    dto: SongTopDayReqDto,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    this.counterMetric.inc({
      module: SongModule.name,
      service: SongService.name,
      function: this.topDay.name
    });
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

  async topWeek(
    dto: SongTopWeekReqDto,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    this.counterMetric.inc({
      module: SongModule.name,
      service: SongService.name,
      function: this.topWeek.name
    });
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

  async unlike(
    _dto: SongUnlikeReqDto,
    id: number,
    sub: number
  ): Promise<DataSongResDto> {
    this.counterMetric.inc({
      module: SongModule.name,
      service: SongService.name,
      function: this.unlike.name
    });
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
