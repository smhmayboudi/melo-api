import { Injectable } from "@nestjs/common";
import { AppImgProxyService } from "../app.img-proxy.service";
import { ConstConfigService } from "./const.config.service";
import { ConstImageResDto } from "./dto/res/const.image.res.dto";

@Injectable()
export class ConstService {
  constructor(
    private readonly constConfigService: ConstConfigService,
    private readonly appImgProxyService: AppImgProxyService
  ) {}

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
