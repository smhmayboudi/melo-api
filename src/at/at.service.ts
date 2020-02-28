import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, UpdateResult } from "typeorm";
import {
  // PromInstanceCounter,
  PromMethodCounter
} from "../prom/prom.decorator";
import { AtEntity } from "./at.entity";
import { AtEntityRepository } from "./at.entity.repository";

@Injectable()
// @PromInstanceCounter
export class AtService {
  constructor(
    @InjectRepository(AtEntity)
    private readonly atEntityRepository: AtEntityRepository
  ) {}

  @PromMethodCounter
  async deleteById(id: number): Promise<DeleteResult> {
    return this.atEntityRepository.delete({ id });
  }

  @PromMethodCounter
  async deleteByToken(token: string): Promise<DeleteResult> {
    return this.atEntityRepository.delete({ token });
  }

  @PromMethodCounter
  async find(): Promise<AtEntity[]> {
    return this.atEntityRepository.find();
  }

  @PromMethodCounter
  async findOneById(id: number): Promise<AtEntity | undefined> {
    return this.atEntityRepository.findOne(id);
  }

  @PromMethodCounter
  async findOneByToken(token: string): Promise<AtEntity | undefined> {
    return this.atEntityRepository.findOne({ token });
  }

  @PromMethodCounter
  async save(entity: AtEntity): Promise<AtEntity> {
    return this.atEntityRepository.save(entity);
  }

  @PromMethodCounter
  async update(entity: AtEntity): Promise<UpdateResult> {
    return this.atEntityRepository.update({ id: entity.id }, entity);
  }

  @PromMethodCounter
  async validateByToken(token: string): Promise<AtEntity | undefined> {
    return this.atEntityRepository.findOne({ token });
  }

  @PromMethodCounter
  async validateBySub(sub: number): Promise<AtEntity | undefined> {
    return this.atEntityRepository.findOne({ user_id: sub });
  }
}
