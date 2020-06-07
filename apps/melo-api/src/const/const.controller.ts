import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ConstImagesReqDto, ConstImagesResDto } from "@melo/common";
import {
  Controller,
  Get,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { AuthGuard } from "@nestjs/passport";
import { ConstService } from "./const.service";

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
  constructor(private readonly constService: ConstService) {}

  @Get("images")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async images(dto: ConstImagesReqDto): Promise<ConstImagesResDto> {
    return this.constService.images(dto);
  }
}
