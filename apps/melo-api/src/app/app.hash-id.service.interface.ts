import {
  AlbumResDto,
  ArtistResDto,
  PlaylistResDto,
  SearchResDto,
  SongResDto,
  TagRelationResDto,
  TagResDto,
} from "@melo/common";

export interface AppHashIdServiceInterface {
  decode(hash: string): number;
  encode(id: number): string;
  encodeAlbum(dto: AlbumResDto): unknown;
  encodeArtist(dto: ArtistResDto): unknown;
  encodePlaylist(dto: PlaylistResDto): unknown;
  encodeSearch(dto: SearchResDto): unknown;
  encodeSong(dto: SongResDto): unknown;
  encodeTag(dto: TagResDto): unknown;
  encodeTagRelation(dto: TagRelationResDto): unknown;
}
