import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";
import {
  // PromInstanceCounter,
  PromMethodCounter
} from "../prom/prom.decorator";
import { JwksEntity } from "./jwks.entity";
import { JwksEntityRepository } from "./jwks.entity.repository";
import { JwksServiceInterface } from "./jwks.service.interface";

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
  async findOneById(id: string): Promise<JwksEntity | undefined> {
    return this.jwksEntityRepository.findOne(id);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async getOneRandom(): Promise<JwksEntity | undefined> {
    return this.jwksEntityRepository
      .createQueryBuilder()
      .orderBy("RAND()")
      .limit(1)
      .getOne();
  }
}
