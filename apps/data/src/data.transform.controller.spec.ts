import {
  AlbumResDto,
  ArtistResDto,
  DataArtistType,
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
  DataElasticsearchArtistResDto,
  DataElasticsearchSearchResDto,
  DataImageResDto,
  DataSearchType,
  PlaylistResDto,
  SongResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { DataTransformController } from "./data.transform.controller";
import { DataTransformService } from "./data.transform.service";
import { DataTransformServiceInterface } from "./data.transform.service.interface";
import { PlaylistModelReqDto } from "@melo/common/playlist/dto/req/playlist.model.req.dto";

describe("DataTransformController", () => {
  const dataConfigElasticsearch: DataConfigElasticsearchReqDto = {
    imagePath: "",
    imagePathDefaultAlbum: "",
    imagePathDefaultArtist: "",
    imagePathDefaultSong: "",
    indexName: "",
    maxSize: 0,
    mp3Endpoint: "",
  };
  const dataConfigImage: DataConfigImageReqDto = {
    imageBaseUrl: "",
    imageEncode: true,
    imageKey: "",
    imageSalt: "",
    imageSignatureSize: 1,
    imageTypeSize: [
      {
        height: 0,
        name: "",
        width: 0,
      },
    ],
  };
  const releaseDate = new Date();
  const image: DataImageResDto = {
    cover: {
      url:
        "3jr-WvcF601FGlXVSkFCJIJ7A4J2z4rtTcTK_UXHi58/rs:fill:1024:1024:1/dpr:1/",
    },
  };
  const artist: ArtistResDto = {
    followersCount: 0,
    fullName: "",
    id: 0,
    image,
    sumSongsDownloadsCount: 1,
    tags: [""],
    type: DataArtistType.prime,
  };
  const album: AlbumResDto = {
    artists: [artist],
    downloadCount: 0,
    id: 0,
    image,
    name: "",
    releaseDate,
    tags: [""],
    tracksCount: 0,
  };
  const artistElastic: DataElasticsearchArtistResDto = {
    available: false,
    dataConfigElasticsearch,
    dataConfigImage,
    followers_count: 0,
    full_name: "",
    has_cover: false,
    id: 0,
    popular: false,
    sum_downloads_count: 1,
    tags: [{ tag: "" }],
    type: DataArtistType.prime,
  };
  const albumElastic: DataElasticsearchSearchResDto = {
    album: "",
    album_downloads_count: 0,
    album_id: 0,
    album_tracks_count: 0,
    artist_followers_count: 0,
    artist_full_name: "",
    artist_id: 0,
    artist_sum_downloads_count: 1,
    artists: [artistElastic],
    copyright: false,
    dataConfigElasticsearch,
    dataConfigImage,
    downloads_count: 0,
    duration: 0,
    has_cover: false,
    has_video: false,
    id: 0,
    localize: false,
    lyrics: "",
    max_audio_rate: 0,
    release_date: releaseDate,
    tags: [{ tag: "" }],
    title: "",
    type: DataSearchType.album,
    unique_name: "",
  };
  const playlistId = "000000000000000000000000";
  const playlistModel: PlaylistModelReqDto = {
    _id: playlistId,
    config: {
      imagePath: "",
      imagePathDefaultPlaylist: "",
    },
    dataConfigElasticsearch,
    dataConfigImage,
    downloads_count: 0,
    followers_count: 0,
    isPublic: false,
    owner_user_id: 0,
    photo_id: "0",
    release_date: releaseDate,
    songs_ids: [0],
    title: "",
    tracks_count: 0,
  };
  const songElastic: DataElasticsearchSearchResDto = {
    album: "",
    album_downloads_count: 0,
    album_id: 0,
    album_tracks_count: 0,
    artist_followers_count: 0,
    artist_full_name: "",
    artist_id: 0,
    artist_sum_downloads_count: 1,
    artists: [artistElastic],
    copyright: false,
    dataConfigElasticsearch,
    dataConfigImage,
    downloads_count: 0,
    duration: 0,
    has_cover: false,
    has_video: false,
    id: 0,
    localize: false,
    lyrics: "",
    max_audio_rate: 0,
    release_date: releaseDate,
    tags: [{ tag: "" }],
    title: "",
    type: DataSearchType.album,
    unique_name: "",
  };
  const song: SongResDto = {
    album,
    artists: [artist],
    audio: {
      medium: {
        fingerprint: "",
        url: "-0.mp3",
      },
    },
    copyrighted: false,
    downloadCount: 0,
    duration: 0,
    hasVideo: false,
    id: 0,
    image,
    localized: false,
    lyrics: "",
    releaseDate,
    tags: [""],
    title: "",
  };
  const playlist: PlaylistResDto = {
    followersCount: 0,
    id: playlistId,
    image,
    isPublic: false,
    releaseDate,
    songs: [song],
    title: "",
    tracksCount: 1,
  };
  const dataTransformServiceMock: DataTransformServiceInterface = {
    album: (): Promise<AlbumResDto> => Promise.resolve(album),
    artist: (): Promise<ArtistResDto> => Promise.resolve(artist),
    playlist: (): Promise<PlaylistResDto> => Promise.resolve(playlist),
    song: (): Promise<SongResDto> => Promise.resolve(song),
  };

  let controller: DataTransformController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataTransformController],
      providers: [
        { provide: DataTransformService, useValue: dataTransformServiceMock },
      ],
    }).compile();
    controller = module.get<DataTransformController>(DataTransformController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("album should be equal to a DataAlbumResDto", async () => {
    const dto: DataElasticsearchSearchResDto = albumElastic;
    expect(await controller.album(dto)).toEqual(album);
  });

  it("artist should be equal to a ArtistResDto", async () => {
    const dto: DataElasticsearchArtistResDto = artistElastic;
    expect(await controller.artist(dto)).toEqual(artist);
  });

  it("playlist should be equal to a ArtistResDto", async () => {
    const dto: PlaylistModelReqDto = playlistModel;
    expect(await controller.playlist(dto)).toEqual(playlist);
  });

  it("song should be equal to a ArtistResDto", async () => {
    const dto: DataElasticsearchSearchResDto = songElastic;
    expect(await controller.song(dto)).toEqual(song);
  });
});
