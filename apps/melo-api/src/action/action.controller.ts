import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ActionBulkReqDto } from "@melo/common";
import { ActionService } from "./action.service";
import { AuthGuard } from "@nestjs/passport";

@ApiBearerAuth("jwt")
@ApiTags("action")
@Controller("action")
@UseGuards(AuthGuard("jwt"))
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
  })
)
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Post("bulk")
  bulk(@Body("actions") dto: ActionBulkReqDto): Promise<ActionBulkReqDto> {
    return this.actionService.bulk(dto);
  }
}
