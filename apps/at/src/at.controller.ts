import {
  AT_SERVICE_DELETE,
  AT_SERVICE_DELETE_BY_TOKEN,
  AT_SERVICE_FIND,
  AT_SERVICE_FIND_ONE,
  AT_SERVICE_FIND_ONE_BY_TOKEN,
  AT_SERVICE_SAVE,
  AT_SERVICE_UPDATE,
  AT_SERVICE_VALIDATE,
  AT_SERVICE_VALIDATE_BY_TOKEN,
  AtDeleteByTokenReqDto,
  AtDeleteReqDto,
  AtFindOneByTokenReqDto,
  AtFindOneReqDto,
  AtResDto,
  AtSaveReqDto,
  AtUpdateReqDto,
  AtValidateByTokenReqDto,
  AtValidateReqDto,
} from "@melo/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { AtService } from "./at.service";
import { Controller } from "@nestjs/common";

@Controller()
export class AtController {
  constructor(private readonly atService: AtService) {}

  @MessagePattern(AT_SERVICE_DELETE)
  delete(@Payload() dto: AtDeleteReqDto): Promise<AtResDto | undefined> {
    return this.atService.delete(dto);
  }

  @MessagePattern(AT_SERVICE_DELETE_BY_TOKEN)
  deleteByToken(
    @Payload() dto: AtDeleteByTokenReqDto
  ): Promise<AtResDto | undefined> {
    return this.atService.deleteByToken(dto);
  }

  @MessagePattern(AT_SERVICE_FIND)
  find(): Promise<AtResDto[]> {
    return this.atService.find();
  }

  @MessagePattern(AT_SERVICE_FIND_ONE)
  findOne(@Payload() dto: AtFindOneReqDto): Promise<AtResDto | undefined> {
    return this.atService.findOne(dto);
  }

  @MessagePattern(AT_SERVICE_FIND_ONE_BY_TOKEN)
  findOneByToken(
    @Payload() dto: AtFindOneByTokenReqDto
  ): Promise<AtResDto | undefined> {
    return this.atService.findOneByToken(dto);
  }

  @MessagePattern(AT_SERVICE_SAVE)
  save(@Payload() dto: AtSaveReqDto): Promise<AtResDto> {
    return this.atService.save(dto);
  }

  @MessagePattern(AT_SERVICE_UPDATE)
  update(@Payload() dto: AtUpdateReqDto): Promise<AtResDto | undefined> {
    return this.atService.update(dto);
  }

  @MessagePattern(AT_SERVICE_VALIDATE)
  validate(@Payload() dto: AtValidateReqDto): Promise<AtResDto | undefined> {
    return this.atService.validate(dto);
  }

  @MessagePattern(AT_SERVICE_VALIDATE_BY_TOKEN)
  validateByToken(
    @Payload() dto: AtValidateByTokenReqDto
  ): Promise<AtResDto | undefined> {
    return this.atService.validateByToken(dto);
  }
}
