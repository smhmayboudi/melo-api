import { Injectable } from "@nestjs/common";
import Imgproxy from "imgproxy";
import { DataImageResDto } from "../data/dto/res/data.image.res.dto";
import { AppConfigService } from "./app.config.service";
import { AppImgProxyServiceInterface } from "./app.img-proxy.service.interface";
import { ImgProxyImageTypeSize } from "./app.module.interface";

@Injectable()
export class AppImgProxyService implements AppImgProxyServiceInterface {
  private readonly imgproxy: Imgproxy;

  constructor(private readonly appConfigService: AppConfigService) {
    this.imgproxy = new Imgproxy({
      baseUrl: this.appConfigService.imgProxyBaseUrl,
      encode: this.appConfigService.imgProxyEncode,
      insecure: false,
      key: this.appConfigService.imgProxyKey,
      salt: this.appConfigService.imgProxySalt,
      signatureSize: this.appConfigService.imgProxySignatureSize
    });
  }

  generateUrl(normal: string, slider?: string): DataImageResDto {
    const images: DataImageResDto = {};
    this.appConfigService.imgProxyImageTypeSize
      .filter(
        (imt: ImgProxyImageTypeSize) =>
          slider === undefined || !imt.name.startsWith("slider")
      )
      .map((imt: ImgProxyImageTypeSize) => {
        images[imt.name] = {
          url: this.imgproxy
            .builder()
            .resize("fill", imt.width, imt.height, true)
            .dpr(1)
            .generateUrl(
              slider === undefined || !imt.name.startsWith("slider")
                ? normal
                : slider
            )
        };
      });
    return images;
  }
}
