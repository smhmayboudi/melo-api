import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";

export interface AppArtistServceInterface {
  follow(artist: DataArtistResDto, sub: number): Promise<DataArtistResDto>;
  follows(
    artists: DataArtistResDto[],
    sub: number
  ): Promise<DataArtistResDto[]>;
}
