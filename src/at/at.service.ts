import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
// import { Counter } from "prom-client";
import { DeleteResult, UpdateResult } from "typeorm";
// import { InjectCounter } from "../prom/prom.decorators";
import { AtEntity } from "./at.entity";
import { AtEntityRepository } from "./at.entity.repository";
// import { AtModule } from "./at.module";

@Injectable()
export class AtService {
  constructor(
    @InjectRepository(AtEntity)
    private readonly atEntityRepository: AtEntityRepository // @InjectCounter("at") // private readonly counter: Counter
  ) {}

  async deleteById(id: number): Promise<DeleteResult> {
    // this.counter.inc({
    //   module: AtModule.name,
    //   service: AtService.name,
    //   function: this.deleteById.name
    // });
    return this.atEntityRepository.delete({ id });
  }

  async deleteByToken(token: string): Promise<DeleteResult> {
    // this.counter.inc({
    //   module: AtModule.name,
    //   service: AtService.name,
    //   function: this.deleteByToken.name
    // });
    return this.atEntityRepository.delete({ token });
  }

  async find(): Promise<AtEntity[]> {
    // this.counter.inc({ module: "at", service: "at", function: "find" });
    return this.atEntityRepository.find();
  }

  async findOneById(id: number): Promise<AtEntity | undefined> {
    // this.counter.inc({
    //   module: AtModule.name,
    //   service: AtService.name,
    //   function: this.findOneById.name
    // });
    return this.atEntityRepository.findOne(id);
  }

  async findOneByToken(token: string): Promise<AtEntity | undefined> {
    // this.counter.inc({
    //   module: AtModule.name,
    //   service: AtService.name,
    //   function: this.findOneByToken.name
    // });
    return this.atEntityRepository.findOne({ token });
  }

  async save(entity: AtEntity): Promise<AtEntity> {
    // this.counter.inc({
    //   module: AtModule.name,
    //   service: AtService.name,
    //   function: this.save.name
    // });
    return this.atEntityRepository.save(entity);
  }

  async update(entity: AtEntity): Promise<UpdateResult> {
    // this.counter.inc({
    //   module: AtModule.name,
    //   service: AtService.name,
    //   function: this.update.name
    // });
    return this.atEntityRepository.update({ id: entity.id }, entity);
  }

  async validateByToken(token: string): Promise<AtEntity | undefined> {
    // this.counter.inc({
    //   module: AtModule.name,
    //   service: AtService.name,
    //   function: this.validateByToken.name
    // });
    return this.atEntityRepository.findOne({ token });
  }

  async validateBySub(sub: number): Promise<AtEntity | undefined> {
    // this.counter.inc({
    //   module: AtModule.name,
    //   service: AtService.name,
    //   function: this.validateBySub.name
    // });
    return this.atEntityRepository.findOne({ user_id: sub });
  }
}
