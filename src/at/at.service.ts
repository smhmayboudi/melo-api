import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, UpdateResult } from "typeorm";
import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";
import {
  // PromInstanceCounter,
  PromMethodCounter
} from "../prom/prom.decorator";
import { AtEntity } from "./at.entity";
import { AtEntityRepository } from "./at.entity.repository";
import { AtServiceInterface } from "./at.service.interface";

@Injectable()
// @PromInstanceCounter
export class AtService implements AtServiceInterface {
  constructor(
    @InjectRepository(AtEntity)
    private readonly atEntityRepository: AtEntityRepository
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async deleteById(id: number): Promise<DeleteResult> {
    return this.atEntityRepository.delete({ id });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async deleteByToken(token: string): Promise<DeleteResult> {
    return this.atEntityRepository.delete({ token });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async find(): Promise<AtEntity[]> {
    return this.atEntityRepository.find();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOneById(id: number): Promise<AtEntity | undefined> {
    return this.atEntityRepository.findOne(id);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOneByToken(token: string): Promise<AtEntity | undefined> {
    return this.atEntityRepository.findOne({ token });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async save(entity: AtEntity): Promise<AtEntity> {
    return this.atEntityRepository.save(entity);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async update(entity: AtEntity): Promise<UpdateResult> {
    return this.atEntityRepository.update({ id: entity.id }, entity);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async validateByToken(token: string): Promise<AtEntity | undefined> {
    return this.atEntityRepository.findOne({ token });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async validateBySub(sub: number): Promise<AtEntity | undefined> {
    return this.atEntityRepository.findOne({ user_id: sub });
  }
}
