import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RtEntity } from "./rt.entity";
import { RtEntityRepository } from "./rt.entity.repository";

@Injectable()
export class RtService {
  constructor(
    @InjectRepository(RtEntity)
    private readonly rtEntityRepository: RtEntityRepository
  ) {}

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

  async deleteById(id: number): Promise<RtEntity | undefined> {
    const rtEntity = await this.findOneById(id);
    await this.rtEntityRepository.delete({ id });
    return rtEntity;
  }

  async deleteByToken(token: string): Promise<RtEntity | undefined> {
    const rtEntity = await this.findOneByToken(token);
    await this.rtEntityRepository.delete({ token });
    return rtEntity;
  }

  async find(): Promise<RtEntity[]> {
    return this.rtEntityRepository.find();
  }

  async findOneById(id: number): Promise<RtEntity | undefined> {
    return this.rtEntityRepository.findOne(id);
  }

  async findOneByToken(token: string): Promise<RtEntity | undefined> {
    return this.rtEntityRepository.findOne({ token });
  }

  async save(entities: RtEntity[]): Promise<RtEntity[]> {
    return this.rtEntityRepository.save(entities);
  }

  async validateBySub(sub: number): Promise<RtEntity | undefined> {
    return this.rtEntityRepository.findOne({
      is_blocked: false,
      user_id: sub
    });
  }

  async validateByToken(token: string): Promise<RtEntity | undefined> {
    return this.rtEntityRepository.findOne({ is_blocked: false, token });
  }
}
