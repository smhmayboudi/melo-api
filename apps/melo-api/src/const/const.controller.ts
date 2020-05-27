import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {
  ConstConfigReqDto,
  ConstImagesReqDto,
  ConstImagesResDto,
  DataConfigImageReqDto,
} from "@melo/common";
import {
  Controller,
  Get,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { AuthGuard } from "@nestjs/passport";
import { ConstConfigService } from "./const.config.service";
import { ConstService } from "./const.service";
import { DataConfigService } from "../data/data.config.service";

@ApiBearerAuth("jwt")
@ApiTags("const")
@Controller("const")
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
  })
)
export class ConstController {
  private config: ConstConfigReqDto = {
    staticImagePaths: this.constConfigService.staticImagePaths,
  };
  private dataConfigImage: DataConfigImageReqDto = {
    imageBaseUrl: this.dataConfigService.imageBaseUrl,
    imageEncode: this.dataConfigService.imageEncode,
    imageKey: this.dataConfigService.imageKey,
    imageSalt: this.dataConfigService.imageSalt,
    imageSignatureSize: this.dataConfigService.imageSignatureSize,
    imageTypeSize: this.dataConfigService.imageTypeSize,
  };

  constructor(
    private readonly constConfigService: ConstConfigService,
    private readonly constService: ConstService,
    private readonly dataConfigService: DataConfigService
  ) {}

  @Get("images")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async images(dto: ConstImagesReqDto): Promise<ConstImagesResDto> {
    return this.constService.images({
      ...dto,
      config: this.config,
      dataConfigImage: this.dataConfigImage,
    });
  }
}
