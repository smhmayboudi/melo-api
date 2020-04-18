import { DataSongResDto } from "../data/dto/res/data.song.res.dto";

export interface AppSongInterface {
  like(songs: DataSongResDto[], sub: number): Promise<DataSongResDto[]>;
}
