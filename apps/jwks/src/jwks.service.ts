import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { BadRequestException, Injectable } from "@nestjs/common";
import { JwksFindOneReqDto, JwksResDto } from "@melo/common";

import { InjectRepository } from "@nestjs/typeorm";
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
    const jwks = await this.jwksEntityRepository.findOne({
      id: dto.id,
    });
    if (jwks === undefined) {
      throw new BadRequestException();
    }
    return jwks;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async getOneRandom(): Promise<JwksResDto | undefined> {
    const jwks = await this.jwksEntityRepository.getOneRandom();
    if (jwks === undefined) {
      throw new BadRequestException();
    }
    return jwks;
  }
}
