import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataPlaylistResDto } from "../data/dto/res/data.playlist.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";

export interface AppEncodingServiceInterface {
  artist(artists: DataArtistResDto): unknown;
  album(album: DataAlbumResDto): unknown;
  song(songs: DataSongResDto): unknown;
  playlist(playlists: DataPlaylistResDto): unknown;
  search(searches: DataSearchResDto): unknown;
}
