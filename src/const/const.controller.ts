import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "../filter/http.exception.filter";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { ConstService } from "./const.service";
import { AuthGuard } from "@nestjs/passport";
import { ImageDto } from "src/data/dto/image.dto";

@ApiBearerAuth("jwt")
@ApiTags("const")
@Controller("const")
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthGuard("jwt"))
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
  async images(): Promise<{ [key: string]: ImageDto }> {
    return this.constService.images();
  }
}
