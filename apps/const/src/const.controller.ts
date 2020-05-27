import {
  CONST_SERVICE_IMAGES,
  ConstImagesReqDto,
  ConstImagesResDto,
} from "@melo/common";

import { ConstService } from "./const.service";
import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class ConstController {
  constructor(private readonly constService: ConstService) {}

  @MessagePattern(CONST_SERVICE_IMAGES)
  images(dto: ConstImagesReqDto): Promise<ConstImagesResDto> {
    return this.constService.images(dto);
  }
}
