import { Test, TestingModule } from "@nestjs/testing";
import { AppMixArtistService } from "../app/app.mix-artist.service";
import { AppMixSongService } from "../app/app.mix-song.service";
import { DataAlbumService } from "../data/data.album.service";
import { DataModule } from "../data/data.module";
import { AlbumService } from "./album.service";

describe("AlbumService", () => {
  const releaseDate = new Date();
  const appMixSongServiceMock = {
    mixSong: (): any => [
      {
        artists: [
          {
            followersCount: 0,
            id: 0,
            type: "prime"
          }
        ],
        audio: {
          high: {
            fingerprint: "",
            url: ""
          }
        },
        duration: 0,
        id: "",
        localized: false,
        releaseDate,
        title: ""
      }
    ]
  };

  const appMixArtistServiceMock = {
    mixArtist: (): any => [
      {
        followersCount: 0,
        id: "",
        type: "prime"
      }
    ]
  };

  const dataAlbumServiceMock = {
    albums: (): any => ({
      results: [
        {
          name: "",
          artists: [
            {
              followersCount: 0,
              id: "",
              type: "prime"
            }
          ],
          releaseDate
        }
      ],
      total: 1
    }),
    byId: (): any => ({
      name: "",
      releaseDate,
      songs: {
        results: [
          {
            artists: [
              {
                followersCount: 0,
                id: 0,
                type: "prime"
              }
            ],
            audio: {
              high: {
                fingerprint: "",
                url: ""
              }
            },
            duration: 0,
            id: "",
            localized: false,
            releaseDate,
            title: ""
          }
        ],
        total: 1
      }
    }),
    latest: (): any => ({
      results: [],
      total: 0
    })
  };
  let albumService: AlbumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DataModule],
      providers: [
        AlbumService,
        { provide: AppMixSongService, useValue: appMixSongServiceMock },
        { provide: AppMixArtistService, useValue: appMixArtistServiceMock },
        { provide: DataAlbumService, useValue: dataAlbumServiceMock }
      ]
    }).compile();
    albumService = module.get<AlbumService>(AlbumService);
  });

  it("should be defined", () => {
    expect(albumService).toBeDefined();
  });

  it("artistAlbums should return list of artists", async () => {
    const req = {
      from: 0,
      artistId: "",
      limit: 0
    };
    expect(await albumService.artistAlbums(req, 0, 0)).toEqual(
      dataAlbumServiceMock.albums()
    );
  });

  it("byId should return an artist", async () => {
    const req = {
      id: ""
    };
    expect(await albumService.byId(req, 0, 0)).toEqual(
      dataAlbumServiceMock.byId()
    );
  });

  it("latest should return list of albums", async () => {
    const req = {
      from: 0,
      language: "",
      limit: 0
    };
    expect(await albumService.latest(req)).toEqual(
      dataAlbumServiceMock.latest()
    );
  });
});
