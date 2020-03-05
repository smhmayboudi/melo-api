import { DataSongResDto } from "../data/dto/res/data.song.res.dto";

export interface AppMixSongServiceInterface {
  mixSong(sub: number, songs: DataSongResDto[]): Promise<DataSongResDto[]>;
}
