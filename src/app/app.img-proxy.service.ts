import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";

import { AppConfigService } from "./app.config.service";
import { AppImgProxyServiceInterface } from "./app.img-proxy.service.interface";
import { DataImageResDto } from "../data/dto/res/data.image.res.dto";
import Imgproxy from "imgproxy";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "../prom/prom.decorator";

@Injectable()
// @PromInstanceCounter
export class AppImgProxyService implements AppImgProxyServiceInterface {
  private readonly imgproxy: Imgproxy;

  constructor(private readonly appConfigService: AppConfigService) {
    this.imgproxy = new Imgproxy({
      baseUrl: this.appConfigService.imgProxyBaseUrl,
      encode: this.appConfigService.imgProxyEncode,
      insecure: false,
      key: this.appConfigService.imgProxyKey,
      salt: this.appConfigService.imgProxySalt,
      signatureSize: this.appConfigService.imgProxySignatureSize,
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  generateUrl(uriNormal: string): DataImageResDto {
    const images: DataImageResDto = {};
    this.appConfigService.imgProxyTypeSize.map((value) => {
      images[value.name] = {
        url: this.imgproxy
          .builder()
          .resize("fill", value.width, value.height, true)
          .dpr(1)
          .generateUrl(uriNormal),
      };
    });
    return images;
  }
}
