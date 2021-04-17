import {
  AlbumResDto,
  ArtistResDto,
  ArtistType,
  ConstImageResDto,
  PlaylistResDto,
  SearchResDto,
  SearchType,
  SongAudioResDto,
  SongResDto,
  TagCreateReqDto,
  TagDeleteReqDto,
  TagRelationResDto,
  TagResDto,
  TagTagsReqDto,
  TagUpdateReqDto,
} from "@melo/common";

import { AppHashIdService } from "../app/app.hash-id.service";
import { AppHashIdServiceInterface } from "../app/app.hash-id.service.interface";
import { TagController } from "./tag.controller";
import { TagService } from "./tag.service";
import { TagServiceInterface } from "./tag.service.interface";
import { Test } from "@nestjs/testing";

describe("TagController", () => {
  const releaseDate = new Date();
  const image: ConstImageResDto = {
    cover: {
      url:
        "Cz6suIAYeF_rXp18UTsU4bHL-gaGsq2PpE2_dLMWj9s/rs:fill:1024:1024:1/dpr:1/plain/asset/pop.jpg",
    },
  };
  const artist: ArtistResDto = {
    followersCount: 0,
    fullName: "",
    id: 0,
    image,
    sumSongsDownloadsCount: 1,
    tags: [""],
    type: ArtistType.prime,
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
  const audio: SongAudioResDto = {
    medium: {
      fingerprint: "",
      url: "-0.mp3",
    },
  };
  const song: SongResDto = {
    album,
    artists: [artist],
    audio,
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
    id: "000000000000000000000000",
    image,
    isPublic: false,
    releaseDate,
    songs: [song],
    title: "",
    tracksCount: 1,
  };
  const search: SearchResDto = {
    album,
    type: SearchType.album,
  };
  const tag: TagResDto = {
    id: 0,
    name: "",
    typeId: 0,
    value: "",
  };
  const tagRelation: TagRelationResDto = {
    category: SearchType.album,
    categoryId: 0,
    id: 0,
    tagId: 0,
  };

  const tagServiceMock: TagServiceInterface = {
    create: () => Promise.resolve(tag),
    delete: () => Promise.resolve(tag),
    tags: () => Promise.resolve([tag]),
    update: () => Promise.resolve(tag),
  };

  const appHashIdServiceMock: AppHashIdServiceInterface = {
    decode: (): number => 0,
    encode: (): string => "",
    encodeAlbum: () => album,
    encodeArtist: () => artist,
    encodePlaylist: () => playlist,
    encodeSearch: () => search,
    encodeSong: () => song,
    encodeTag: () => tag,
    encodeTagRelation: () => tagRelation,
  };

  let controller: TagController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TagController],
      providers: [
        { provide: TagService, useValue: tagServiceMock },
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
      ],
    }).compile();
    controller = module.get<TagController>(TagController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("create should equal to a tag", async () => {
    const dto: TagCreateReqDto = {
      name: "",
      typeId: 0,
      value: "",
    };
    expect(await controller.create(dto)).toEqual(tag);
  });

  it("delete should be equal to a tag", async () => {
    const dto: TagDeleteReqDto = { id: 0 };
    expect(await controller.delete(dto)).toEqual(tag);
  });

  it("tags should be equal to an array of tags", async () => {
    const dto: TagTagsReqDto = { from: 0, size: 0 };
    expect(await controller.tags(dto)).toEqual([tag]);
  });

  it("update should be equal to a tag", async () => {
    const dto: TagUpdateReqDto = { id: 0, name: "", typeId: 0, value: "" };
    expect(await controller.update(dto)).toEqual(tag);
  });
});
