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
import { RtEntity } from "./rt.entity";
import { RtService } from "./rt.service";
import { AuthGuard } from "@nestjs/passport";

@ApiBearerAuth("jwt")
@ApiTags("token")
@Controller("token")
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
export class RtController {
  constructor(private readonly rtService: RtService) {}

  @Get()
  find(): Promise<RtEntity[]> {
    return this.rtService.find();
  }
}
