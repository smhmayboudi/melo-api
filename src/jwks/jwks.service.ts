import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  // PromInstanceCounter,
  PromMethodCounter
} from "../prom/prom.decorator";
import { JwksEntity } from "./jwks.entity";
import { JwksEntityRepository } from "./jwks.entity.repository";

@Injectable()
// @PromInstanceCounter
export class JwksService {
  constructor(
    @InjectRepository(JwksEntity)
    private readonly jwksEntityRepository: JwksEntityRepository
  ) {}

  @PromMethodCounter
  async findOneById(id: string): Promise<JwksEntity | undefined> {
    return this.jwksEntityRepository.findOne(id);
  }

  @PromMethodCounter
  async getOneRandom(): Promise<JwksEntity | undefined> {
    return this.jwksEntityRepository
      .createQueryBuilder()
      .orderBy("RAND()")
      .limit(1)
      .getOne();
  }
}
