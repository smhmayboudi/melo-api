import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  // PromInstanceCounter,
  PromMethodCounter
} from "../prom/prom.decorators";
import { RtEntity } from "./rt.entity";
import { RtEntityRepository } from "./rt.entity.repository";

@Injectable()
// // @PromInstanceCounter
export class RtService {
  constructor(
    @InjectRepository(RtEntity)
    private readonly rtEntityRepository: RtEntityRepository
  ) {}

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

  @PromMethodCounter
  async deleteById(id: number): Promise<RtEntity | undefined> {
    const rtEntity = await this.findOneById(id);
    await this.rtEntityRepository.delete({ id });
    return rtEntity;
  }

  @PromMethodCounter
  async deleteByToken(token: string): Promise<void> {
    await this.rtEntityRepository.delete({ token });
  }

  @PromMethodCounter
  async find(): Promise<RtEntity[]> {
    return this.rtEntityRepository.find();
  }

  @PromMethodCounter
  async findOneById(id: number): Promise<RtEntity | undefined> {
    return this.rtEntityRepository.findOne(id);
  }

  @PromMethodCounter
  async findOneByToken(token: string): Promise<RtEntity | undefined> {
    return this.rtEntityRepository.findOne({ token });
  }

  @PromMethodCounter
  async save(entities: RtEntity[]): Promise<RtEntity[]> {
    return this.rtEntityRepository.save(entities);
  }

  @PromMethodCounter
  async validateBySub(sub: number): Promise<RtEntity | undefined> {
    return this.rtEntityRepository.findOne({
      is_blocked: false,
      user_id: sub
    });
  }

  @PromMethodCounter
  async validateByToken(token: string): Promise<RtEntity | undefined> {
    return this.rtEntityRepository.findOne({ is_blocked: false, token });
  }
}
