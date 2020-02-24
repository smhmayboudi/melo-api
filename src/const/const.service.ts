import { Injectable } from "@nestjs/common";
import { AppImgProxyService } from "../app/app.img-proxy.service";
import {
  // PromInstanceCounter,
  PromMethodCounter
} from "../prom/prom.decorators";
import { ConstConfigService } from "./const.config.service";
import { ConstImageResDto } from "./dto/res/const.image.res.dto";

@Injectable()
// @PromInstanceCounter
export class ConstService {
  constructor(
    private readonly constConfigService: ConstConfigService,
    private readonly appImgProxyService: AppImgProxyService
  ) {}

  @PromMethodCounter
  async images(): Promise<{ [key: string]: ConstImageResDto }> {
    const images: { [key: string]: ConstImageResDto } = {};
    for (const image in this.constConfigService.staticImagePaths) {
      images[image] = this.appImgProxyService.generateUrl(
        this.constConfigService.staticImagePaths[image]
      );
    }
    return Promise.resolve(images);
  }
}
