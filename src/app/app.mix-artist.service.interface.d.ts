import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";

export interface AppMixArtistServiceInterface {
  mixArtist(
    sub: number,
    artists: DataArtistResDto[]
  ): Promise<DataArtistResDto[]>;
}
