import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwksEntity } from "./jwks.entity";
import { JwksEntityRepository } from "./jwks.entity.repository";

@Injectable()
export class JwksService {
  constructor(
    @InjectRepository(JwksEntity)
    private readonly jwksRepository: JwksEntityRepository
  ) {}

  async find(): Promise<JwksEntity[]> {
    return this.jwksRepository.find();
  }

  async findOne(id: string): Promise<JwksEntity | undefined> {
    return this.jwksRepository.findOne(id);
  }

  async getOneRandom(): Promise<JwksEntity | undefined> {
    return this.jwksRepository.findOne("4f2d3063-8fdb-4919-8f4d-deb7bef235e7");
  }
}
