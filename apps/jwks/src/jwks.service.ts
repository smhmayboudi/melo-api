import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { JwksFindOneReqDto, JwksResDto } from "@melo/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { JwksEntity } from "./jwks.entity";
import { JwksEntityRepository } from "./jwks.entity.repository";
import { JwksServiceInterface } from "./jwks.service.interface";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class JwksService implements JwksServiceInterface {
  constructor(
    @InjectRepository(JwksEntity)
    private readonly jwksEntityRepository: JwksEntityRepository
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOne(dto: JwksFindOneReqDto): Promise<JwksResDto | undefined> {
    return await this.jwksEntityRepository.findOne({
      id: dto.id,
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async getOneRandom(): Promise<JwksResDto | undefined> {
    return await this.jwksEntityRepository.getOneRandom();
  }
}
