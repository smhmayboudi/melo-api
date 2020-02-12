import { CounterMetric, InjectCounterMetric } from "@digikare/nestjs-prom";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, UpdateResult } from "typeorm";
import { AtEntity } from "./at.entity";
import { AtEntityRepository } from "./at.entity.repository";

@Injectable()
export class AtService {
  constructor(
    @InjectRepository(AtEntity)
    private readonly atEntityRepository: AtEntityRepository,
    @InjectCounterMetric("at_counter")
    private readonly counterMetric: CounterMetric
  ) {}

  async deleteById(id: number): Promise<DeleteResult> {
    this.counterMetric.inc(
      { module: "at", service: "at", function: "deleteById" },
      1,
      Date.now()
    );
    return this.atEntityRepository.delete({ id });
  }

  async deleteByToken(token: string): Promise<DeleteResult> {
    this.counterMetric.inc(
      { module: "at", service: "at", function: "deleteByToken" },
      1,
      Date.now()
    );
    return this.atEntityRepository.delete({ token });
  }

  async find(): Promise<AtEntity[]> {
    this.counterMetric.inc(
      { module: "at", service: "at", function: "find" },
      1,
      Date.now()
    );
    return this.atEntityRepository.find();
  }

  async findOneById(id: number): Promise<AtEntity | undefined> {
    this.counterMetric.inc(
      { module: "at", service: "at", function: "findOneById" },
      1,
      Date.now()
    );
    return this.atEntityRepository.findOne(id);
  }

  async findOneByToken(token: string): Promise<AtEntity | undefined> {
    this.counterMetric.inc(
      { module: "at", service: "at", function: "findOneByToken" },
      1,
      Date.now()
    );
    return this.atEntityRepository.findOne({ token });
  }

  async save(entity: AtEntity): Promise<AtEntity> {
    this.counterMetric.inc(
      { module: "at", service: "at", function: "save" },
      1,
      Date.now()
    );
    return this.atEntityRepository.save(entity);
  }

  async update(entity: AtEntity): Promise<UpdateResult> {
    this.counterMetric.inc(
      { module: "at", service: "at", function: "update" },
      1,
      Date.now()
    );
    return this.atEntityRepository.update({ id: entity.id }, entity);
  }

  async validateByToken(token: string): Promise<AtEntity | undefined> {
    this.counterMetric.inc(
      { module: "at", service: "at", function: "validateByToken" },
      1,
      Date.now()
    );
    return this.atEntityRepository.findOne({ token });
  }

  async validateBySub(sub: number): Promise<AtEntity | undefined> {
    this.counterMetric.inc(
      { module: "at", service: "at", function: "validateBySub" },
      1,
      Date.now()
    );
    return this.atEntityRepository.findOne({ user_id: sub });
  }
}
