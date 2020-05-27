import { MessagePattern, Payload } from "@nestjs/microservices";
import {
  RT_SERVICE_BLOCK,
  RT_SERVICE_BLOCK_BY_TOKEN,
  RT_SERVICE_DELETE,
  RT_SERVICE_DELETE_BY_TOKEN,
  RT_SERVICE_FIND,
  RT_SERVICE_FIND_ONE,
  RT_SERVICE_FIND_ONE_BY_TOKEN,
  RT_SERVICE_SAVE,
  RT_SERVICE_VALIDATE,
  RT_SERVICE_VALIDATE_BY_TOKEN,
  RtBlockByTokenReqDto,
  RtBlockReqDto,
  RtDeleteByTokenReqDto,
  RtDeleteReqDto,
  RtFindOneByTokenReqDto,
  RtFindOneReqDto,
  RtResDto,
  RtSaveReqDto,
  RtValidateByTokenReqDto,
  RtValidateReqDto,
} from "@melo/common";

import { Controller } from "@nestjs/common";
import { RtService } from "./rt.service";

@Controller()
export class RtController {
  constructor(private readonly rtService: RtService) {}

  @MessagePattern(RT_SERVICE_BLOCK)
  block(@Payload() dto: RtBlockReqDto): Promise<RtResDto | undefined> {
    return this.rtService.block(dto);
  }

  @MessagePattern(RT_SERVICE_BLOCK_BY_TOKEN)
  blockByToken(
    @Payload() dto: RtBlockByTokenReqDto
  ): Promise<RtResDto | undefined> {
    return this.rtService.blockByToken(dto);
  }

  @MessagePattern(RT_SERVICE_DELETE)
  delete(@Payload() dto: RtDeleteReqDto): Promise<RtResDto | undefined> {
    return this.rtService.delete(dto);
  }

  @MessagePattern(RT_SERVICE_DELETE_BY_TOKEN)
  deleteByToken(
    @Payload() dto: RtDeleteByTokenReqDto
  ): Promise<RtResDto | undefined> {
    return this.rtService.deleteByToken(dto);
  }

  @MessagePattern(RT_SERVICE_FIND)
  find(): Promise<RtResDto[]> {
    return this.rtService.find();
  }

  @MessagePattern(RT_SERVICE_FIND_ONE)
  findOne(@Payload() dto: RtFindOneReqDto): Promise<RtResDto | undefined> {
    return this.rtService.findOne(dto);
  }

  @MessagePattern(RT_SERVICE_FIND_ONE_BY_TOKEN)
  findOneByToken(
    @Payload() dto: RtFindOneByTokenReqDto
  ): Promise<RtResDto | undefined> {
    return this.rtService.findOneByToken(dto);
  }

  @MessagePattern(RT_SERVICE_SAVE)
  save(@Payload() dto: RtSaveReqDto): Promise<RtResDto> {
    return this.rtService.save(dto);
  }

  @MessagePattern(RT_SERVICE_VALIDATE)
  validate(@Payload() dto: RtValidateReqDto): Promise<RtResDto | undefined> {
    return this.rtService.validate(dto);
  }

  @MessagePattern(RT_SERVICE_VALIDATE_BY_TOKEN)
  validateByToken(
    @Payload() dto: RtValidateByTokenReqDto
  ): Promise<RtResDto | undefined> {
    return this.rtService.validateByToken(dto);
  }
}
