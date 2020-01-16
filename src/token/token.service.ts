import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenEntity } from "./token.entity";
import { TokenEntityRepository } from "./token.entity.repository";

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: TokenEntityRepository
  ) {}

  delete(id: number): void {
    this.tokenRepository.delete(id);
  }

  async find(): Promise<TokenEntity[]> {
    return this.tokenRepository.find();
  }

  async findOne(id: number): Promise<TokenEntity | undefined> {
    return this.tokenRepository.findOne(id);
  }

  async findOneByToken(token: string): Promise<TokenEntity | undefined> {
    return this.tokenRepository.findOne({ token });
  }

  async save(entities: TokenEntity[]): Promise<TokenEntity[]> {
    return this.tokenRepository.save(entities);
  }
}
