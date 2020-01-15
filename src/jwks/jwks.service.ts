import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwksEntity } from "./jwks.entity";
import { JwksEntityRepository } from "./jwks.entity.repository";

@Injectable()
export class JwksService {
  constructor(
    @InjectRepository(JwksEntity)
    private readonly jwksRepository: JwksEntityRepository
  ) {}

  async find(): Promise<JwksEntity[]> {
    return this.jwksRepository.find();
  }

  async findOne(id: string): Promise<JwksEntity | undefined> {
    return this.jwksRepository.findOne(id);
  }

  async getOneRandom(): Promise<JwksEntity | undefined> {
    return this.jwksRepository
      .createQueryBuilder()
      .orderBy("RAND()")
      .limit(1)
      .getOne();
  }
}
