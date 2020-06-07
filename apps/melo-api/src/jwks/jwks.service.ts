import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { Inject, Injectable } from "@nestjs/common";
import {
  JWKS_SERVICE,
  JWKS_SERVICE_FIND_ONE,
  JWKS_SERVICE_GET_ONE_RANDOM,
  JwksFindOneReqDto,
  JwksResDto,
} from "@melo/common";

import { ClientProxy } from "@nestjs/microservices";
import { JwksServiceInterface } from "./jwks.service.interface";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class JwksService implements JwksServiceInterface {
  constructor(
    @Inject(JWKS_SERVICE) private readonly jwksClientProxy: ClientProxy
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOne(dto: JwksFindOneReqDto): Promise<JwksResDto | undefined> {
    return this.jwksClientProxy
      .send<JwksResDto | undefined, JwksFindOneReqDto>(
        JWKS_SERVICE_FIND_ONE,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async getOneRandom(): Promise<JwksResDto | undefined> {
    return this.jwksClientProxy
      .send<JwksResDto | undefined>(JWKS_SERVICE_GET_ONE_RANDOM, {})
      .toPromise();
  }
}
