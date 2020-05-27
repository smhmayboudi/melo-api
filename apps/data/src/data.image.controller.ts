import {
  DATA_CONST_SERVICE_GENERATE_URL,
  DataImageReqDto,
  DataImageResDto,
} from "@melo/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { Controller } from "@nestjs/common";
import { DataImageService } from "./data.image.service";

@Controller()
export class DataImageController {
  constructor(private readonly dataImageService: DataImageService) {}

  @MessagePattern(DATA_CONST_SERVICE_GENERATE_URL)
  generateUrl(@Payload() dto: DataImageReqDto): Promise<DataImageResDto> {
    return this.dataImageService.generateUrl(dto);
  }
}
