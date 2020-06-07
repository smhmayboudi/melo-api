import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { Inject, Injectable } from "@nestjs/common";
import {
  RT_SERVICE,
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

import { ClientProxy } from "@nestjs/microservices";
import { PromMethodCounter } from "@melo/prom";
import { RtServiceInterface } from "./rt.service.interface";

@Injectable()
// @PromInstanceCounter
export class RtService implements RtServiceInterface {
  constructor(
    @Inject(RT_SERVICE) private readonly rtClientProxy: ClientProxy
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async block(dto: RtBlockReqDto): Promise<RtResDto | undefined> {
    return this.rtClientProxy
      .send<RtResDto | undefined, RtBlockReqDto>(RT_SERVICE_BLOCK, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async blockByToken(dto: RtBlockByTokenReqDto): Promise<RtResDto | undefined> {
    return this.rtClientProxy
      .send<RtResDto | undefined, RtBlockByTokenReqDto>(
        RT_SERVICE_BLOCK_BY_TOKEN,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async delete(dto: RtDeleteReqDto): Promise<RtResDto | undefined> {
    return this.rtClientProxy
      .send<RtResDto | undefined, RtDeleteReqDto>(RT_SERVICE_DELETE, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async deleteByToken(
    dto: RtDeleteByTokenReqDto
  ): Promise<RtResDto | undefined> {
    return this.rtClientProxy
      .send<RtResDto | undefined, RtDeleteByTokenReqDto>(
        RT_SERVICE_DELETE_BY_TOKEN,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async find(): Promise<RtResDto[]> {
    return this.rtClientProxy.send<RtResDto[]>(RT_SERVICE_FIND, {}).toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOne(dto: RtFindOneReqDto): Promise<RtResDto | undefined> {
    return this.rtClientProxy
      .send<RtResDto | undefined, RtFindOneReqDto>(RT_SERVICE_FIND_ONE, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOneByToken(
    dto: RtFindOneByTokenReqDto
  ): Promise<RtResDto | undefined> {
    return this.rtClientProxy
      .send<RtResDto | undefined, RtFindOneByTokenReqDto>(
        RT_SERVICE_FIND_ONE_BY_TOKEN,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async save(dto: RtSaveReqDto): Promise<RtResDto> {
    return this.rtClientProxy
      .send<RtResDto, RtSaveReqDto>(RT_SERVICE_SAVE, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async validate(dto: RtValidateReqDto): Promise<RtResDto | undefined> {
    return this.rtClientProxy
      .send<RtResDto | undefined, RtValidateReqDto>(RT_SERVICE_VALIDATE, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async validateByToken(
    dto: RtValidateByTokenReqDto
  ): Promise<RtResDto | undefined> {
    return this.rtClientProxy
      .send<RtResDto | undefined, RtValidateByTokenReqDto>(
        RT_SERVICE_VALIDATE_BY_TOKEN,
        dto
      )
      .toPromise();
  }
}
