import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  ConstImageReqDto,
  ConstImageResDto,
  ConstImagesReqDto,
  ConstImagesResDto,
} from "@melo/common";

import { ConstServiceInterface } from "./const.service.interface";
import Imgproxy from "imgproxy";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class ConstService implements ConstServiceInterface {
  async image(dto: ConstImageReqDto): Promise<ConstImageResDto> {
    const imgproxy = new Imgproxy({
      baseUrl: dto.dataConfigImage.imageBaseUrl,
      encode: dto.dataConfigImage.imageEncode,
      insecure: false,
      key: dto.dataConfigImage.imageKey,
      salt: dto.dataConfigImage.imageSalt,
      signatureSize: dto.dataConfigImage.imageSignatureSize,
    });
    const images: any = {};
    dto.dataConfigImage.imageTypeSize.forEach((value) => {
      // eslint-disable-next-line functional/immutable-data
      images[value.name] = {
        url: imgproxy
          .builder()
          .resize("fill", value.width, value.height, true)
          .dpr(1)
          .generateUrl(dto.uri),
      };
    });
    return Promise.resolve(images);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async images(dto: ConstImagesReqDto): Promise<ConstImagesResDto> {
    const images: ConstImagesResDto = {};
    // eslint-disable-next-line functional/no-loop-statement
    for (const image in dto.config.staticImagePaths) {
      // eslint-disable-next-line functional/immutable-data
      images[image] = await this.image({
        ...dto,
        uri: dto.config.staticImagePaths[image],
      });
    }
    return images;
  }
}
