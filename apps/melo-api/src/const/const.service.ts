import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { ConstImagesReqDto, ConstImagesResDto } from "@melo/common";

import { ConstServiceInterface } from "./const.service.interface";
import { DataImageService } from "../data/data.image.service";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class ConstService implements ConstServiceInterface {
  constructor(private readonly dataImageService: DataImageService) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async images(dto: ConstImagesReqDto): Promise<ConstImagesResDto> {
    const images: ConstImagesResDto = {};
    // eslint-disable-next-line functional/no-loop-statement
    for (const image in dto.config.staticImagePaths) {
      // eslint-disable-next-line functional/immutable-data
      images[image] = await this.dataImageService.generateUrl({
        ...dto,
        uri: dto.config.staticImagePaths[image],
      });
    }
    return Promise.resolve(images);
  }
}
