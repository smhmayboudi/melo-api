import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { ConstImageReqDto, ConstImageResDto } from "@melo/common";

import { DataImageServiceInterface } from "./data.image.service.interface";
import Imgproxy from "imgproxy";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class DataImageService implements DataImageServiceInterface {
  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async generateUrl(dto: ConstImageReqDto): Promise<ConstImageResDto> {
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
}
