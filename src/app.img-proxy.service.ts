import { Injectable } from "@nestjs/common";
import Imgproxy from "imgproxy";
import { AppConfigService } from "./app.config.service";
import { ImageDto } from "./data/dto/image.dto";
import { JpgDto } from "./data/dto/jpg.dto";

@Injectable()
export class AppImgProxyService {
  private readonly imgproxy: Imgproxy;

  constructor(private readonly appConfigService: AppConfigService) {
    this.imgproxy = new Imgproxy({
      baseUrl: this.appConfigService.imgProxyUrl,
      key: this.appConfigService.imgProxyKey,
      salt: this.appConfigService.imgProxySalt,
      encode: true
    });
  }

  public make(url: string, width: number, height: number): JpgDto {
    return {
      url: this.imgproxy
        .builder()
        .resize("fill", width, height, true)
        .dpr(1)
        .generateUrl(url)
    };
  }

  public all(normal: string, slider?: string): ImageDto {
    const images: ImageDto = {};
    this.appConfigService.imageTypeSize.map(
      (imt: { name: string; width: number; height: number }) => {
        if (imt.name.startsWith("slider") && slider === null) {
          return;
        }
        images[imt.name] =
          imt.name.startsWith("slider") && slider === null
            ? this.make(slider, imt.width, imt.height)
            : this.make(normal, imt.width, imt.height);
      }
    );

    return images;
  }
}
