import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult } from "typeorm";
import { RtEntity } from "./rt.entity";
import { RtEntityRepository } from "./rt.entity.repository";

@Injectable()
export class RtService {
  constructor(
    @InjectRepository(RtEntity)
    private readonly rtRepository: RtEntityRepository
  ) {}

  async deleteById(id: number): Promise<DeleteResult> {
    return this.rtRepository.delete({ id });
  }

  async deleteByToken(token: string): Promise<DeleteResult> {
    return this.rtRepository.delete({ token });
  }

  async find(): Promise<RtEntity[]> {
    return this.rtRepository.find();
  }

  async findOneById(id: number): Promise<RtEntity | undefined> {
    return this.rtRepository.findOne(id);
  }

  async findOneByToken(token: string): Promise<RtEntity | undefined> {
    return this.rtRepository.findOne({ token });
  }

  async save(entities: RtEntity[]): Promise<RtEntity[]> {
    return this.rtRepository.save(entities);
  }

  async validateByToken(token: string): Promise<RtEntity | undefined> {
    return this.rtRepository.findOne({ token });
  }

  async validateByUserId(userId: number): Promise<RtEntity | undefined> {
    return this.rtRepository.findOne({ user_id: userId });
  }
}
