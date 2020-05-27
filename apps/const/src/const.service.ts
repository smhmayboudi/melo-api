import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  ConstImagesReqDto,
  ConstImagesResDto,
  DATA_CONST_SERVICE_GENERATE_URL,
  DATA_SERVICE,
  DataImageReqDto,
  DataImageResDto,
} from "@melo/common";
import { Inject, Injectable } from "@nestjs/common";

import { ClientProxy } from "@nestjs/microservices";
import { ConstServiceInterface } from "./const.service.interface";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class ConstService implements ConstServiceInterface {
  constructor(
    @Inject(DATA_SERVICE) private readonly clientProxy: ClientProxy
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async images(dto: ConstImagesReqDto): Promise<ConstImagesResDto> {
    const images: ConstImagesResDto = {};
    // eslint-disable-next-line functional/no-loop-statement
    for (const image in dto.config.staticImagePaths) {
      // eslint-disable-next-line functional/immutable-data
      images[image] = await this.clientProxy
        .send<DataImageResDto, DataImageReqDto>(
          DATA_CONST_SERVICE_GENERATE_URL,
          {
            ...dto,
            uri: dto.config.staticImagePaths[image],
          }
        )
        .toPromise();
    }
    return images;
  }
}
