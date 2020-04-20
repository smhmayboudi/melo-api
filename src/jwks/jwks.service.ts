import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";

import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { JwksEntity } from "./jwks.entity";
import { JwksEntityRepository } from "./jwks.entity.repository";
import { JwksJwksResDto } from "./dto/res/jwks.jwks.res.dto";
import { JwksServiceInterface } from "./jwks.service.interface";
import { PromMethodCounter } from "../prom/prom.decorator";

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
  async findOneById(id: string): Promise<JwksJwksResDto | undefined> {
    return this.jwksEntityRepository.findOne(id);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async getOneRandom(): Promise<JwksJwksResDto | undefined> {
    return this.jwksEntityRepository.getOneRandom();
  }
}
