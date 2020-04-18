import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {
  Controller,
  Get,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { AuthGuard } from "@nestjs/passport";
import { ConstImageResDto } from "./dto/res/const.image.res.dto";
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
  async images(): Promise<{ [key: string]: ConstImageResDto }> {
    return this.constService.images();
  }
}
