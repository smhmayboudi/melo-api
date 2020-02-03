import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEditReqDto } from "./dto/req/user.edit.req.dto";
import { UserEntity } from "./user.entity";
import { UserEntityRepository } from "./user.entity.repository";
import { UserPaginationResDto } from "./dto/res/user.pagination.res.dto";
import { UserUserResDto } from "./dto/res/user.user.res.dto";
import { userConstant } from "./user.constant";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: UserEntityRepository
  ) {}

  async find(): Promise<UserPaginationResDto<UserUserResDto>> {
    const results = (await this.userEntityRepository.find()).map(value => ({
      ...value,
      id: value.id.toString()
    }));
    return {
      results: results,
      total: results.length
    } as UserPaginationResDto<UserUserResDto>;
  }

  async findOneById(id: number): Promise<UserEntity | undefined> {
    return this.userEntityRepository.findOne({ id });
  }

  async findOneByUsernam(username: string): Promise<UserEntity | undefined> {
    return this.userEntityRepository.findOne({ username });
  }

  async findOneByTelegramId(
    telegramId: number
  ): Promise<UserEntity | undefined> {
    return this.userEntityRepository.findOne({ telegram_id: telegramId });
  }

  async edit(dto: UserEditReqDto): Promise<UserUserResDto> {
    const userEntity = await this.save({ ...dto, id: 0 });
    return {
      ...userEntity,
      id: userEntity.id.toString()
    };
  }

  async get(sub: number): Promise<UserUserResDto> {
    const user = await this.findOneById(sub);
    if (user === undefined) {
      throw new BadRequestException(userConstant.errors.service.userNotFound);
    }
    return {
      ...user,
      id: user.id.toString()
    };
  }

  async save(dto: UserEntity): Promise<UserEntity> {
    return this.userEntityRepository.save(dto);
  }
}
