import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwksEntity } from "./jwks.entity";
import { JwksEntityRepository } from "./jwks.entity.repository";

@Injectable()
export class JwksService {
  constructor(
    @InjectRepository(JwksEntity)
    private readonly jwksEntityRepository: JwksEntityRepository
  ) {}

  async findOneById(id: string): Promise<JwksEntity | undefined> {
    return this.jwksEntityRepository.findOne(id);
  }

  async getOneRandom(): Promise<JwksEntity | undefined> {
    return this.jwksEntityRepository
      .createQueryBuilder()
      .orderBy("RAND()")
      .limit(1)
      .getOne();
  }
}
