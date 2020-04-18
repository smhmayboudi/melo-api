import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataPlaylistResDto } from "../data/dto/res/data.playlist.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";

export interface AppEncodingServiceInterface {
  encodeArtists(artists: DataArtistResDto[]): DataArtistResDto[];
  encodeAlbums(album: DataAlbumResDto[]): DataAlbumResDto[];
  encodeSongs(songs: DataSongResDto[]): DataSongResDto[];
  encodePlaylists(playlists: DataPlaylistResDto[]): DataPlaylistResDto[];
  encodeSearches(searches: DataSearchResDto[]): DataSearchResDto[];
}
