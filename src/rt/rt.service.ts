import { CounterMetric, InjectCounterMetric } from "@digikare/nestjs-prom";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RtEntity } from "./rt.entity";
import { RtEntityRepository } from "./rt.entity.repository";

@Injectable()
export class RtService {
  constructor(
    @InjectCounterMetric("rt_counter")
    private readonly counterMetric: CounterMetric,

    @InjectRepository(RtEntity)
    private readonly rtEntityRepository: RtEntityRepository
  ) {}

  async blockById(
    id: number,
    description: string
  ): Promise<RtEntity | undefined> {
    this.counterMetric.inc(
      { module: "rt", service: "rt", function: "blockById" },
      1,
      Date.now()
    );
    await this.rtEntityRepository.update(
      { id },
      { description, is_blocked: true }
    );
    const rtEntity = await this.findOneById(id);
    return rtEntity;
  }

  async blockByToken(
    token: string,
    description: string
  ): Promise<RtEntity | undefined> {
    this.counterMetric.inc(
      { module: "rt", service: "rt", function: "blockByToken" },
      1,
      Date.now()
    );
    await this.rtEntityRepository.update(
      { token },
      { description, is_blocked: true }
    );
    const rtEntity = await this.findOneByToken(token);
    return rtEntity;
  }

  async deleteById(id: number): Promise<RtEntity | undefined> {
    this.counterMetric.inc(
      { module: "rt", service: "rt", function: "deleteById" },
      1,
      Date.now()
    );
    const rtEntity = await this.findOneById(id);
    await this.rtEntityRepository.delete({ id });
    return rtEntity;
  }

  async deleteByToken(token: string): Promise<void> {
    this.counterMetric.inc(
      { module: "rt", service: "rt", function: "deleteByToken" },
      1,
      Date.now()
    );
    await this.rtEntityRepository.delete({ token });
  }

  async find(): Promise<RtEntity[]> {
    this.counterMetric.inc(
      { module: "rt", service: "rt", function: "find" },
      1,
      Date.now()
    );
    return this.rtEntityRepository.find();
  }

  async findOneById(id: number): Promise<RtEntity | undefined> {
    this.counterMetric.inc(
      { module: "rt", service: "rt", function: "findOneById" },
      1,
      Date.now()
    );
    return this.rtEntityRepository.findOne(id);
  }

  async findOneByToken(token: string): Promise<RtEntity | undefined> {
    this.counterMetric.inc(
      { module: "rt", service: "rt", function: "findOneByToken" },
      1,
      Date.now()
    );
    return this.rtEntityRepository.findOne({ token });
  }

  async save(entities: RtEntity[]): Promise<RtEntity[]> {
    this.counterMetric.inc(
      { module: "rt", service: "rt", function: "save" },
      1,
      Date.now()
    );
    return this.rtEntityRepository.save(entities);
  }

  async validateBySub(sub: number): Promise<RtEntity | undefined> {
    this.counterMetric.inc(
      { module: "rt", service: "rt", function: "validateBySub" },
      1,
      Date.now()
    );
    return this.rtEntityRepository.findOne({
      is_blocked: false,
      user_id: sub
    });
  }

  async validateByToken(token: string): Promise<RtEntity | undefined> {
    this.counterMetric.inc(
      { module: "rt", service: "rt", function: "validateByToken" },
      1,
      Date.now()
    );
    return this.rtEntityRepository.findOne({ is_blocked: false, token });
  }
}
