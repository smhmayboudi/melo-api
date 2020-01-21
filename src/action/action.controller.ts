import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "../filter/http.exception.filter";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { ActionService } from "./action.service";
import { ActionDto } from "./dto/action.dto";

@ApiBearerAuth("jwt")
@ApiTags("action")
@Controller("action")
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
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Post("bulk")
  async bulk(@Body("actions") actions: ActionDto): Promise<boolean> {
    return this.actionService.bulk(actions);
  }
}
