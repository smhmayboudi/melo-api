import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
// import { Counter } from "prom-client";
// import { InjectCounter } from "../prom/prom.decorators";
import { JwksEntity } from "./jwks.entity";
import { JwksEntityRepository } from "./jwks.entity.repository";
// import { JwksModule } from "./jwks.module";

@Injectable()
export class JwksService {
  constructor(
    // @InjectCounter("jwks")
    // private readonly counter: Counter,
    @InjectRepository(JwksEntity)
    private readonly jwksEntityRepository: JwksEntityRepository
  ) {}

  async findOneById(id: string): Promise<JwksEntity | undefined> {
    // this.counter.inc({
    //   module: JwksModule.name,
    //   service: JwksService.name,
    //   function: this.findOneById.name
    // });
    return this.jwksEntityRepository.findOne(id);
  }

  async getOneRandom(): Promise<JwksEntity | undefined> {
    // this.counter.inc({
    //   module: JwksModule.name,
    //   service: JwksService.name,
    //   function: this.getOneRandom.name
    // });
    return this.jwksEntityRepository
      .createQueryBuilder()
      .orderBy("RAND()")
      .limit(1)
      .getOne();
  }
}
