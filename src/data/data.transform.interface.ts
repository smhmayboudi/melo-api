import { DataAlbumResDto } from "./dto/res/data.album.res.dto";
import { DataArtistElasticResDto } from "./dto/res/data.artist.elastic.res.dto";
import { DataArtistResDto } from "./dto/res/data.artist.res.dto";
import { DataSearchElasticResDto } from "./dto/res/data.search.elastic.res.dto";
import { DataSongResDto } from "./dto/res/data.song.res.dto";

export interface DataTransformServiceInterface {
  transformAlbum(album: DataSearchElasticResDto): DataAlbumResDto;
  transformArtist(artist: DataArtistElasticResDto): DataArtistResDto;
  transformSong(song: DataSearchElasticResDto): DataSongResDto;
}
