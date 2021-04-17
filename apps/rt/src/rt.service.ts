import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  RtBlockByTokenReqDto,
  RtBlockReqDto,
  RtDeleteByTokenReqDto,
  RtDeleteReqDto,
  RtFindOneByTokenReqDto,
  RtFindOneReqDto,
  RtResDto,
  RtSaveReqDto,
  RtValidateByTokenReqDto,
  RtValidateReqDto,
} from "@melo/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "@melo/prom";
import { RtEntity } from "./rt.entity";
import { RtEntityRepository } from "./rt.entity.repository";
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
  async block(dto: RtBlockReqDto): Promise<RtResDto | undefined> {
    await this.rtEntityRepository.update(
      { id: dto.id },
      { description: dto.description, is_blocked: true }
    );
    return await this.findOne(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async blockByToken(dto: RtBlockByTokenReqDto): Promise<RtResDto | undefined> {
    await this.rtEntityRepository.update(
      { token: dto.token },
      { description: dto.description, is_blocked: true }
    );
    return await this.findOneByToken(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async delete(dto: RtDeleteReqDto): Promise<RtResDto | undefined> {
    const rt = await this.findOne(dto);
    await this.rtEntityRepository.delete({
      id: dto.id,
    });
    return rt;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async deleteByToken(
    dto: RtDeleteByTokenReqDto
  ): Promise<RtResDto | undefined> {
    const rt = await this.findOneByToken(dto);
    await this.rtEntityRepository.delete({
      token: dto.token,
    });
    return rt;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async find(): Promise<RtResDto[]> {
    return this.rtEntityRepository.find();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOne(dto: RtFindOneReqDto): Promise<RtResDto | undefined> {
    return await this.rtEntityRepository.findOne({
      id: dto.id,
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOneByToken(
    dto: RtFindOneByTokenReqDto
  ): Promise<RtResDto | undefined> {
    return await this.rtEntityRepository.findOne({
      token: dto.token,
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async save(dto: RtSaveReqDto): Promise<RtResDto> {
    return this.rtEntityRepository.save(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async validate(dto: RtValidateReqDto): Promise<RtResDto | undefined> {
    return await this.rtEntityRepository.findOne({
      is_blocked: false,
      user_id: dto.sub,
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async validateByToken(
    dto: RtValidateByTokenReqDto
  ): Promise<RtResDto | undefined> {
    return await this.rtEntityRepository.findOne({
      is_blocked: false,
      token: dto.token,
    });
  }
}
