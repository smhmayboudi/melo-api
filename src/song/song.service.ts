import { Injectable } from "@nestjs/common";
import { SongGenreDto } from "./dto/song.genre.dto";
import { SongGetDto } from "./dto/song.get.dto";
import { SongLanguageDto } from "./dto/song.language.dto";
import { SongLikeDto } from "./dto/song.like.dto";
import { SongLikedDto } from "./dto/song.liked.dto";
import { SongMoodDto } from "./dto/song.mood.dto";
import { SongNewDto } from "./dto/song.new.dto";
import { SongNewPodcastDto } from "./dto/song.new.podcast.dto";
import { SongPodcastGenresDto } from "./dto/song.podcast.genres.dto";
import { SongSendTelegramDto } from "./dto/song.send.telegram.dto";
import { SongSimilarDto } from "./dto/song.similar.dto";
import { SongSliderLatestDto } from "./dto/song.slider.latest.dto";
import { SongTopDayDto } from "./dto/song.top.day.dto";
import { SongTopWeekDto } from "./dto/song.top.week.dto";
import { SongUnlikeDto } from "./dto/song.unlike.dto";

@Injectable()
export class SongService {
  // constructor() {}

  async genre(dto: SongGenreDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async get(dto: SongGetDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async language(dto: SongLanguageDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async like(dto: SongLikeDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async liked(dto: SongLikedDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async mood(dto: SongMoodDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async new(dto: SongNewDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async newPodcast(dto: SongNewPodcastDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async podcast(dto: SongPodcastGenresDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async podcastGenres(dto: SongPodcastGenresDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async sendTelegram(dto: SongSendTelegramDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async similar(dto: SongSimilarDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async sliderLatest(dto: SongSliderLatestDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async topDay(dto: SongTopDayDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async topWeek(dto: SongTopWeekDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async unlike(dto: SongUnlikeDto): Promise<any> {
    return Promise.resolve(dto);
  }
}
