import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";

import { AppImgProxyService } from "../app/app.img-proxy.service";
import { ConstConfigService } from "./const.config.service";
import { ConstImageResDto } from "./dto/res/const.image.res.dto";
import { ConstServiceInterface } from "./const.service.interface";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class ConstService implements ConstServiceInterface {
  constructor(
    private readonly constConfigService: ConstConfigService,
    private readonly appImgProxyService: AppImgProxyService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
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
