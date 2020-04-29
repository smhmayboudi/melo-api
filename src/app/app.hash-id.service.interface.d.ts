import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataPlaylistResDto } from "../data/dto/res/data.playlist.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";

export interface AppHashIdServiceInterface {
  decode(hash: string): number;
  encode(id: number): string;
  encodeAlbum(album: DataAlbumResDto): unknown;
  encodeArtist(artists: DataArtistResDto): unknown;
  encodePlaylist(playlists: DataPlaylistResDto): unknown;
  encodeSearch(searches: DataSearchResDto): unknown;
  encodeSong(songs: DataSongResDto): unknown;
}
