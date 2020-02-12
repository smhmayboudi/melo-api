import { CounterMetric, InjectCounterMetric } from "@digikare/nestjs-prom";
import { Injectable } from "@nestjs/common";
import { AppImgProxyService } from "../app.img-proxy.service";
import { ConstConfigService } from "./const.config.service";
import { ConstImageResDto } from "./dto/res/const.image.res.dto";

@Injectable()
export class ConstService {
  constructor(
    private readonly constConfigService: ConstConfigService,
    @InjectCounterMetric("const_counter")
    private readonly counterMetric: CounterMetric,
    private readonly appImgProxyService: AppImgProxyService
  ) {}

  async images(): Promise<{ [key: string]: ConstImageResDto }> {
    this.counterMetric.inc(
      { module: "const", service: "const", function: "images" },
      1,
      Date.now()
    );
    const images: { [key: string]: ConstImageResDto } = {};
    for (const image in this.constConfigService.staticImagePaths) {
      images[image] = this.appImgProxyService.generateUrl(
        this.constConfigService.staticImagePaths[image]
      );
    }
    return Promise.resolve(images);
  }
}
