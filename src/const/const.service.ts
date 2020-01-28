import { Injectable } from "@nestjs/common";
import { ConstConfigService } from "./const.config.service";
import { AppImgProxyService } from "../app.img-proxy.service";
import { ImageDto } from "../data/dto/image.dto";

@Injectable()
export class ConstService {
  constructor(
    private readonly constConfigService: ConstConfigService,
    private readonly appImgProxyService: AppImgProxyService
  ) {}

  async images(): Promise<{ [key: string]: ImageDto }> {
    const images: { [key: string]: ImageDto } = {};
    for (const image in this.constConfigService.staticImageUrl) {
      if (this.constConfigService.staticImageUrl[image]) {
        images[image] = this.appImgProxyService.all(
          this.constConfigService.staticImageUrl[image],
          undefined
        );
      }
    }
    return Promise.resolve(images);
  }
}
