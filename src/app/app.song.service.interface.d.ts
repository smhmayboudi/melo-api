import { DataSongResDto } from "../data/dto/res/data.song.res.dto";

export interface AppSongServiceInterface {
  like(songs: DataSongResDto[], sub: number): Promise<DataSongResDto[]>;
  localize(songs: DataSongResDto[]): DataSongResDto[];
}
