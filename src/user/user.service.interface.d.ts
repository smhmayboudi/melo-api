import { UserEditReqDto } from "./dto/req/user.edit.req.dto";
import { UserUserResDto } from "./dto/res/user.user.res.dto";
import { UserEntity } from "./user.entity";

export interface UserServiceInterface {
  find(): Promise<UserUserResDto[]>;
  findOneById(id: number): Promise<UserUserResDto | undefined>;
  findOneByTelegramId(telegramId: number): Promise<UserUserResDto | undefined>;
  findOneByUsernam(username: string): Promise<UserUserResDto | undefined>;
  get(sub: number): Promise<UserUserResDto | undefined>;
  put(dto: UserEditReqDto, sub): Promise<UserUserResDto>;
  save(dto: UserEntity): Promise<UserUserResDto>;
}
