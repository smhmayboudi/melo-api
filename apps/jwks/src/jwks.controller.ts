import {
  JWKS_SERVICE_FIND_ONE,
  JWKS_SERVICE_GET_ONE_RANDOM,
  JwksFindOneReqDto,
  JwksResDto,
} from "@melo/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { Controller } from "@nestjs/common";
import { JwksService } from "./jwks.service";

@Controller()
export class JwksController {
  constructor(private readonly jwksService: JwksService) {}

  @MessagePattern(JWKS_SERVICE_FIND_ONE)
  findOne(
    @Payload()
    dto: JwksFindOneReqDto
  ): Promise<JwksResDto | undefined> {
    return this.jwksService.findOne(dto);
  }

  @MessagePattern(JWKS_SERVICE_GET_ONE_RANDOM)
  getOneRandom(): Promise<JwksResDto | undefined> {
    return this.jwksService.getOneRandom();
  }
}
