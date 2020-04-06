import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";

export interface AppMixArtistServiceInterface {
  mixArtist(
    artists: DataArtistResDto[],
    sub: number
  ): Promise<DataArtistResDto[]>;
}
