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
  TagAssignReqDto,
  TagRelationResDto,
  TagResDto,
  TagUnassignReqDto,
} from "@melo/common";

import { AppHashIdService } from "../app/app.hash-id.service";
import { AppHashIdServiceInterface } from "../app/app.hash-id.service.interface";
import { TagRelationController } from "./tag-relation.controller";
import { TagRelationService } from "./tag-relation.service";
import { TagRelationServiceInterface } from "./tag-relation.service.interface";
import { Test } from "@nestjs/testing";

describe("TagRelationController", () => {
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

  const tagRelationServiceMock: TagRelationServiceInterface = {
    assign: () => Promise.resolve(tagRelation),
    unassign: () => Promise.resolve(tagRelation),
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

  let controller: TagRelationController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TagRelationController],
      providers: [
        { provide: TagRelationService, useValue: tagRelationServiceMock },
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
      ],
    }).compile();
    controller = module.get<TagRelationController>(TagRelationController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("assign should be equal to a tag relation", async () => {
    const dto: TagAssignReqDto = {
      category: SearchType.album,
      categoryId: 0,
      tagId: 0,
    };
    expect(await controller.assign(dto)).toEqual(tagRelation);
  });

  it("unassign should be equal to a tag relation", async () => {
    const dto: TagUnassignReqDto = { id: 0 };
    expect(await controller.unassign(dto)).toEqual(tagRelation);
  });
});
