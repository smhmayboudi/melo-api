import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { ConstService } from "./const.service";
import { ConstImageResDto } from "./dto/res/const.image.res.dto";

@ApiBearerAuth("jwt")
@ApiTags("const")
@Controller("const")
@UseInterceptors(ClassSerializerInterceptor, ErrorInterceptor)
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true
  })
)
export class ConstController {
  constructor(private readonly constService: ConstService) {}

  @Get("images")
  @UseGuards(AuthGuard(["anonymId", "jwt"]))
  async images(): Promise<{ [key: string]: ConstImageResDto }> {
    return this.constService.images();
  }
}
