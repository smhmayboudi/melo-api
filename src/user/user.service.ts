import { CounterMetric, InjectCounterMetric } from "@digikare/nestjs-prom";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEditReqDto } from "./dto/req/user.edit.req.dto";
import { UserEntity } from "./user.entity";
import { UserEntityRepository } from "./user.entity.repository";
import { UserUserResDto } from "./dto/res/user.user.res.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectCounterMetric("user_counter")
    private readonly counterMetric: CounterMetric,
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: UserEntityRepository
  ) {}

  async find(): Promise<UserUserResDto[]> {
    this.counterMetric.inc(
      { module: "song", service: "song", function: "find" },
      1,
      Date.now()
    );
    return this.userEntityRepository.find();
  }

  async findOneById(id: number): Promise<UserUserResDto | undefined> {
    this.counterMetric.inc(
      { module: "song", service: "song", function: "findOneById" },
      1,
      Date.now()
    );
    return this.userEntityRepository.findOne({ id });
  }

  async findOneByTelegramId(
    telegramId: number
  ): Promise<UserEntity | undefined> {
    this.counterMetric.inc(
      { module: "song", service: "song", function: "findOneByTelegramId" },
      1,
      Date.now()
    );
    return this.userEntityRepository.findOne({ telegram_id: telegramId });
  }

  async findOneByUsernam(
    username: string
  ): Promise<UserUserResDto | undefined> {
    this.counterMetric.inc(
      { module: "song", service: "song", function: "findOneByUsernam" },
      1,
      Date.now()
    );
    return this.userEntityRepository.findOne({ username });
  }

  async get(sub: number): Promise<UserUserResDto | undefined> {
    this.counterMetric.inc(
      { module: "song", service: "song", function: "get" },
      1,
      Date.now()
    );
    return this.findOneById(sub);
  }

  async put(dto: UserEditReqDto, sub): Promise<UserUserResDto> {
    this.counterMetric.inc(
      { module: "song", service: "song", function: "put" },
      1,
      Date.now()
    );
    return this.save({ ...dto, id: sub });
  }

  async save(dto: UserEntity): Promise<UserUserResDto> {
    this.counterMetric.inc(
      { module: "song", service: "song", function: "save" },
      1,
      Date.now()
    );
    return this.userEntityRepository.save(dto);
  }
}
