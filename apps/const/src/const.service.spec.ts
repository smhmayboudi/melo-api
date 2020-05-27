import {
  ConstConfigReqDto,
  ConstImagesReqDto,
  DATA_SERVICE,
  DataConfigImageReqDto,
  DataImageResDto,
} from "@melo/common";
import { Observable, of } from "rxjs";
import { Test, TestingModule } from "@nestjs/testing";

import { ConstService } from "./const.service";

describe("ConstService", () => {
  const config: ConstConfigReqDto = {
    staticImagePaths: {
      pop: "/asset/pop.jpg",
    },
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
  const image: DataImageResDto = {
    pop: {
      url: "/asset/pop.jpg",
    },
  };

  // TODO: interface ?
  const clientProxyMock = {
    send: (): Observable<DataImageResDto> => of(image),
  };

  let service: ConstService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: DATA_SERVICE, useValue: clientProxyMock },
        ConstService,
      ],
    }).compile();
    service = module.get<ConstService>(ConstService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("images should be equal to an image", async () => {
    const dto: ConstImagesReqDto = {
      config,
      dataConfigImage,
    };
    expect(await service.images(dto)).toEqual({ pop: image });
  });
});
