import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  ConstImageReqDto,
  ConstImageResDto,
  ConstImagesReqDto,
  ConstImagesResDto,
} from "@melo/common";

import { ConstConfigService } from "./const.config.service";
import { ConstServiceInterface } from "./const.service.interface";
import Imgproxy from "imgproxy";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class ConstService implements ConstServiceInterface {
  constructor(private readonly constConfigService: ConstConfigService) {}
  async image(dto: ConstImageReqDto): Promise<ConstImageResDto> {
    const imgproxy = new Imgproxy({
      baseUrl: this.constConfigService.imageBaseUrl,
      encode: this.constConfigService.imageEncode,
      insecure: false,
      key: this.constConfigService.imageKey,
      salt: this.constConfigService.imageSalt,
      signatureSize: this.constConfigService.imageSignatureSize,
    });
    const images: any = {};
    this.constConfigService.imageTypeSize.forEach((value) => {
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
    for (const image in this.constConfigService.staticImagePaths) {
      // eslint-disable-next-line functional/immutable-data
      images[image] = await this.image({
        ...dto,
        uri: this.constConfigService.staticImagePaths[image],
      });
    }
    return images;
  }
}
