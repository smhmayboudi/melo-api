import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";

import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "../prom/prom.decorator";
import { RtEntity } from "./rt.entity";
import { RtEntityRepository } from "./rt.entity.repository";
import { RtRtResDto } from "./dto/res/rt.rt.res.dto";
import { RtServiceInterface } from "./rt.service.interface";

@Injectable()
// @PromInstanceCounter
export class RtService implements RtServiceInterface {
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
  ): Promise<RtRtResDto | undefined> {
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
  ): Promise<RtRtResDto | undefined> {
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
  async deleteById(id: number): Promise<RtRtResDto | undefined> {
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
  async find(): Promise<RtRtResDto[]> {
    return this.rtEntityRepository.find();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOneById(id: number): Promise<RtRtResDto | undefined> {
    return this.rtEntityRepository.findOne(id);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOneByToken(token: string): Promise<RtRtResDto | undefined> {
    return this.rtEntityRepository.findOne({ token });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async save(entity: RtEntity): Promise<RtRtResDto> {
    return this.rtEntityRepository.save(entity);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async validateBySub(sub: number): Promise<RtRtResDto | undefined> {
    return this.rtEntityRepository.findOne({
      is_blocked: false,
      user_id: sub,
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async validateByToken(token: string): Promise<RtRtResDto | undefined> {
    return this.rtEntityRepository.findOne({ is_blocked: false, token });
  }
}
