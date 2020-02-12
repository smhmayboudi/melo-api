import { CounterMetric, InjectCounterMetric } from "@digikare/nestjs-prom";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwksEntity } from "./jwks.entity";
import { JwksEntityRepository } from "./jwks.entity.repository";

@Injectable()
export class JwksService {
  constructor(
    @InjectCounterMetric("jwks_counter")
    private readonly counterMetric: CounterMetric,
    @InjectRepository(JwksEntity)
    private readonly jwksEntityRepository: JwksEntityRepository
  ) {}

  async findOneById(id: string): Promise<JwksEntity | undefined> {
    this.counterMetric.inc(
      { module: "jwks", service: "jwks", function: "findOneById" },
      1,
      Date.now()
    );
    return this.jwksEntityRepository.findOne(id);
  }

  async getOneRandom(): Promise<JwksEntity | undefined> {
    this.counterMetric.inc(
      { module: "jwks", service: "jwks", function: "getOneRandom" },
      1,
      Date.now()
    );
    return this.jwksEntityRepository
      .createQueryBuilder()
      .orderBy("RAND()")
      .limit(1)
      .getOne();
  }
}
