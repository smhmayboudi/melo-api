import { DataSongResDto } from "../data/dto/res/data.song.res.dto";

export interface AppCheckLikeServiceInterface {
  like(songs: DataSongResDto[], sub: number): Promise<DataSongResDto[]>;
}
