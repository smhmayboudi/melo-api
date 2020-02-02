import { Injectable } from "@nestjs/common";
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
    const results = (await this.userEntityRepository.find()).map(value => {
      return {
        id: value.id,
        avatar: value.avatar,
        biography: value.biography,
        birthday: value.birthday,
        cellphone: value.cellphone,
        email: value.email,
        firstname: value.firstname,
        gender: value.gender,
        language_code: value.language_code,
        lastname: value.lastname,
        registered_date: value.registered_date,
        telegram_id: value.telegram_id,
        username: value.username
      } as UserUserResDto;
    });
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
    return Promise.resolve({
      id: userEntity.id,
      avatar: userEntity.avatar,
      biography: userEntity.biography,
      birthday: userEntity.birthday,
      cellphone: userEntity.cellphone,
      email: userEntity.email,
      firstname: userEntity.firstname,
      gender: userEntity.gender,
      language_code: userEntity.language_code,
      lastname: userEntity.lastname,
      registered_date: userEntity.registered_date,
      telegram_id: userEntity.telegram_id,
      username: userEntity.username
    });
  }

  async get(sub: number): Promise<UserUserResDto> {
    const user = await this.findOneById(sub);
    if (user === undefined) {
      throw new Error(userConstant.errors.service.userNotFound);
    }
    return {
      id: user.id,
      avatar: user.avatar,
      biography: user.biography,
      birthday: user.birthday,
      cellphone: user.cellphone,
      email: user.email,
      firstname: user.firstname,
      gender: user.gender,
      language_code: user.language_code,
      lastname: user.lastname,
      registered_date: user.registered_date,
      telegram_id: user.telegram_id,
      username: user.username
    };
  }

  async save(dto: UserEntity): Promise<UserEntity> {
    return this.userEntityRepository.save(dto);
  }
}
