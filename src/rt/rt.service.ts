import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";
import {
  // PromInstanceCounter,
  PromMethodCounter
} from "../prom/prom.decorator";
import { RtEntity } from "./rt.entity";
import { RtEntityRepository } from "./rt.entity.repository";

@Injectable()
// @PromInstanceCounter
export class RtService {
  constructor(
    @InjectRepository(RtEntity)
    private readonly rtEntityRepository: RtEntityRepository
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async blockById(
    id: number,
    description: string
  ): Promise<RtEntity | undefined> {
    await this.rtEntityRepository.update(
      { id },
      { description, is_blocked: true }
    );
    const rtEntity = await this.findOneById(id);
    return rtEntity;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async blockByToken(
    token: string,
    description: string
  ): Promise<RtEntity | undefined> {
    await this.rtEntityRepository.update(
      { token },
      { description, is_blocked: true }
    );
    const rtEntity = await this.findOneByToken(token);
    return rtEntity;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async deleteById(id: number): Promise<RtEntity | undefined> {
    const rtEntity = await this.findOneById(id);
    await this.rtEntityRepository.delete({ id });
    return rtEntity;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async deleteByToken(token: string): Promise<void> {
    await this.rtEntityRepository.delete({ token });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async find(): Promise<RtEntity[]> {
    return this.rtEntityRepository.find();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOneById(id: number): Promise<RtEntity | undefined> {
    return this.rtEntityRepository.findOne(id);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOneByToken(token: string): Promise<RtEntity | undefined> {
    return this.rtEntityRepository.findOne({ token });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async save(entities: RtEntity[]): Promise<RtEntity[]> {
    return this.rtEntityRepository.save(entities);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async validateBySub(sub: number): Promise<RtEntity | undefined> {
    return this.rtEntityRepository.findOne({
      is_blocked: false,
      user_id: sub
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async validateByToken(token: string): Promise<RtEntity | undefined> {
    return this.rtEntityRepository.findOne({ is_blocked: false, token });
  }
}
