import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult } from "typeorm";
import { RtEntity } from "./rt.entity";
import { RtEntityRepository } from "./rt.entity.repository";

@Injectable()
export class RtService {
  constructor(
    @InjectRepository(RtEntity)
    private readonly rtEntityRepository: RtEntityRepository
  ) {}

  async blockById(id: number, description: string): Promise<DeleteResult> {
    const rtEntity = await this.rtEntityRepository.findOne({ id });
    return this.rtEntityRepository.update(
      { id },
      { ...rtEntity, description, is_blocked: true }
    );
  }

  async blockByToken(
    token: string,
    description: string
  ): Promise<DeleteResult> {
    const rtEntity = await this.rtEntityRepository.findOne({ token });
    return this.rtEntityRepository.update(
      { token },
      { ...rtEntity, description, is_blocked: true }
    );
  }

  async deleteById(id: number): Promise<DeleteResult> {
    return this.rtEntityRepository.delete({ id });
  }

  async deleteByToken(token: string): Promise<DeleteResult> {
    return this.rtEntityRepository.delete({ token });
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

  async validateByToken(token: string): Promise<RtEntity | undefined> {
    return this.rtEntityRepository.findOne({ is_blocked: false, token });
  }

  async validateByUserId(userId: number): Promise<RtEntity | undefined> {
    return this.rtEntityRepository.findOne({
      is_blocked: false,
      user_id: userId
    });
  }
}
