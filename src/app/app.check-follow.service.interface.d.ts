import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";

export interface AppCheckFollowServiceInterface {
  follow(artists: DataArtistResDto[], sub: number): Promise<DataArtistResDto[]>;
}
