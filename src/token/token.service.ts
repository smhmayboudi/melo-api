import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult } from "typeorm";
import { TokenEntity } from "./token.entity";
import { TokenEntityRepository } from "./token.entity.repository";

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: TokenEntityRepository
  ) {}

  async blockById(id: number, description: string): Promise<DeleteResult> {
    const tokenEntity = await this.tokenRepository.findOne({ id });
    return this.tokenRepository.update(
      { id },
      { ...tokenEntity, description, is_blocked: true }
    );
  }

  async blockByTokenId(
    token: string,
    description: string
  ): Promise<DeleteResult> {
    const tokenEntity = await this.tokenRepository.findOne({ token });
    return this.tokenRepository.update(
      { token },
      { ...tokenEntity, description, is_blocked: true }
    );
  }

  async deleteById(id: number): Promise<DeleteResult> {
    return this.tokenRepository.delete({ id });
  }

  async deleteByToken(token: string): Promise<DeleteResult> {
    return this.tokenRepository.delete({ token });
  }

  async find(): Promise<TokenEntity[]> {
    return this.tokenRepository.find();
  }

  async findOneById(id: number): Promise<TokenEntity | undefined> {
    return this.tokenRepository.findOne(id);
  }

  async findOneByToken(token: string): Promise<TokenEntity | undefined> {
    return this.tokenRepository.findOne({ token });
  }

  async save(entities: TokenEntity[]): Promise<TokenEntity[]> {
    return this.tokenRepository.save(entities);
  }

  async validateByToken(token: string): Promise<TokenEntity | undefined> {
    return this.tokenRepository.findOne({ is_blocked: false, token });
  }

  async validateByUserId(userId: number): Promise<TokenEntity | undefined> {
    return this.tokenRepository.findOne({ is_blocked: false, user_id: userId });
  }
}
