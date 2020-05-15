import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { DeleteResult, UpdateResult } from "typeorm";

import { AtAtResDto } from "./dto/res/at.at.res.dto";
import { AtEntity } from "./at.entity";
import { AtEntityRepository } from "./at.entity.repository";
import { AtServiceInterface } from "./at.service.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "@melo/prom";

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
  async find(): Promise<AtAtResDto[]> {
    return this.atEntityRepository.find();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOneById(id: number): Promise<AtAtResDto | undefined> {
    return this.atEntityRepository.findOne(id);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOneByToken(token: string): Promise<AtAtResDto | undefined> {
    return this.atEntityRepository.findOne({ token });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async save(entity: AtEntity): Promise<AtAtResDto> {
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
  async validateByToken(token: string): Promise<AtAtResDto | undefined> {
    return this.atEntityRepository.findOne({ token });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async validateBySub(sub: number): Promise<AtAtResDto | undefined> {
    return this.atEntityRepository.findOne({ user_id: sub });
  }
}
