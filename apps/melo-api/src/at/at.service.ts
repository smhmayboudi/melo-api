import {
  AT_SERVICE,
  AT_SERVICE_DELETE,
  AT_SERVICE_DELETE_BY_TOKEN,
  AT_SERVICE_FIND,
  AT_SERVICE_FIND_ONE,
  AT_SERVICE_FIND_ONE_BY_TOKEN,
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
import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { Inject, Injectable } from "@nestjs/common";
import { AtServiceInterface } from "./at.service.interface";
import { ClientProxy } from "@nestjs/microservices";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class AtService implements AtServiceInterface {
  constructor(
    @Inject(AT_SERVICE) private readonly atClientProxy: ClientProxy
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async delete(dto: AtDeleteReqDto): Promise<AtResDto | undefined> {
    return this.atClientProxy
      .send<AtResDto | undefined, AtDeleteReqDto>(AT_SERVICE_DELETE, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async deleteByToken(
    dto: AtDeleteByTokenReqDto
  ): Promise<AtResDto | undefined> {
    return this.atClientProxy
      .send<AtResDto | undefined, AtDeleteByTokenReqDto>(
        AT_SERVICE_DELETE_BY_TOKEN,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async find(): Promise<AtResDto[]> {
    return this.atClientProxy.send<AtResDto[]>(AT_SERVICE_FIND, {}).toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOne(dto: AtFindOneReqDto): Promise<AtResDto | undefined> {
    return this.atClientProxy
      .send<AtResDto | undefined, AtFindOneReqDto>(AT_SERVICE_FIND_ONE, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOneByToken(
    dto: AtFindOneByTokenReqDto
  ): Promise<AtResDto | undefined> {
    return this.atClientProxy
      .send<AtResDto | undefined, AtFindOneByTokenReqDto>(
        AT_SERVICE_FIND_ONE_BY_TOKEN,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async save(dto: AtSaveReqDto): Promise<AtResDto> {
    return this.atClientProxy
      .send<AtResDto, AtSaveReqDto>(AT_SERVICE_FIND_ONE_BY_TOKEN, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async update(dto: AtUpdateReqDto): Promise<AtResDto | undefined> {
    return this.atClientProxy
      .send<AtResDto | undefined, AtUpdateReqDto>(AT_SERVICE_UPDATE, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async validateByToken(
    dto: AtValidateByTokenReqDto
  ): Promise<AtResDto | undefined> {
    return this.atClientProxy
      .send<AtResDto | undefined, AtValidateByTokenReqDto>(
        AT_SERVICE_VALIDATE_BY_TOKEN,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async validate(dto: AtValidateReqDto): Promise<AtResDto | undefined> {
    return this.atClientProxy
      .send<AtResDto | undefined, AtValidateReqDto>(AT_SERVICE_VALIDATE, dto)
      .toPromise();
  }
}
