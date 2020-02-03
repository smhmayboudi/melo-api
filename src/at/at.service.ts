import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, UpdateResult } from "typeorm";
import { AtEntity } from "./at.entity";
import { AtEntityRepository } from "./at.entity.repository";

@Injectable()
export class AtService {
  constructor(
    @InjectRepository(AtEntity)
    private readonly atEntityRepository: AtEntityRepository
  ) {}

  async deleteById(id: number): Promise<DeleteResult> {
    return this.atEntityRepository.delete({ id });
  }

  async deleteByToken(token: string): Promise<DeleteResult> {
    return this.atEntityRepository.delete({ token });
  }

  async find(): Promise<AtEntity[]> {
    return this.atEntityRepository.find();
  }

  async findOneById(id: number): Promise<AtEntity | undefined> {
    return this.atEntityRepository.findOne(id);
  }

  async findOneByToken(token: string): Promise<AtEntity | undefined> {
    return this.atEntityRepository.findOne({ token });
  }

  async save(entity: AtEntity): Promise<AtEntity> {
    return this.atEntityRepository.save(entity);
  }

  async update(entity: AtEntity): Promise<UpdateResult> {
    return this.atEntityRepository.update({ id: entity.id }, entity);
  }

  async validateByToken(token: string): Promise<AtEntity | undefined> {
    return this.atEntityRepository.findOne({ token });
  }

  async validateBySub(sub: number): Promise<AtEntity | undefined> {
    return this.atEntityRepository.findOne({ user_id: sub });
  }
}
