import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  AtDeleteByTokenReqDto,
  AtDeleteReqDto,
  AtFindOneByTokenReqDto,
  AtFindOneReqDto,
  AtResDto,
  AtSaveReqDto,
  AtUpdateReqDto,
  AtValidateByTokenReqDto,
  AtValidateReqDto,
} from "@melo/common";

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
  async delete(dto: AtDeleteReqDto): Promise<AtResDto | undefined> {
    const at = await this.findOne(dto);
    await this.atEntityRepository.delete({
      id: dto.id,
    });
    return at;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async deleteByToken(
    dto: AtDeleteByTokenReqDto
  ): Promise<AtResDto | undefined> {
    const at = await this.findOneByToken(dto);
    await this.atEntityRepository.delete({
      token: dto.token,
    });
    return at;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async find(): Promise<AtResDto[]> {
    return this.atEntityRepository.find();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOne(dto: AtFindOneReqDto): Promise<AtResDto | undefined> {
    return await this.atEntityRepository.findOne({
      id: dto.id,
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOneByToken(
    dto: AtFindOneByTokenReqDto
  ): Promise<AtResDto | undefined> {
    return await this.atEntityRepository.findOne(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async save(dto: AtSaveReqDto): Promise<AtResDto> {
    return this.atEntityRepository.save(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async update(dto: AtUpdateReqDto): Promise<AtResDto | undefined> {
    await this.atEntityRepository.update(
      {
        id: dto.id,
      },
      dto
    );
    return this.findOne(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async validateByToken(
    dto: AtValidateByTokenReqDto
  ): Promise<AtResDto | undefined> {
    return await this.atEntityRepository.findOne({
      token: dto.token,
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async validate(dto: AtValidateReqDto): Promise<AtResDto | undefined> {
    return await this.atEntityRepository.findOne({
      user_id: dto.sub,
    });
  }
}
