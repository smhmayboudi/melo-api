import { Injectable } from "@nestjs/common";
// import { Counter } from "prom-client";
import { AppImgProxyService } from "../app/app.img-proxy.service";
// import { InjectCounter } from "../prom/prom.decorators";
import { ConstConfigService } from "./const.config.service";
// import { ConstModule } from "./const.module";
import { ConstImageResDto } from "./dto/res/const.image.res.dto";

@Injectable()
export class ConstService {
  constructor(
    private readonly constConfigService: ConstConfigService,
    // @InjectCounter("const")
    // private readonly counter: Counter,
    private readonly appImgProxyService: AppImgProxyService
  ) {}

  async images(): Promise<{ [key: string]: ConstImageResDto }> {
    // this.counter.inc({
    //   module: ConstModule.name,
    //   service: ConstService.name,
    //   function: this.images.name
    // });
    const images: { [key: string]: ConstImageResDto } = {};
    for (const image in this.constConfigService.staticImagePaths) {
      images[image] = this.appImgProxyService.generateUrl(
        this.constConfigService.staticImagePaths[image]
      );
    }
    return Promise.resolve(images);
  }
}
