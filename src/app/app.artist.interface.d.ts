import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";

export interface AppArtistInterface {
  follow(artists: DataArtistResDto[], sub: number): Promise<DataArtistResDto[]>;
}
