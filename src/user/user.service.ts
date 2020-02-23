import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
// import { Counter } from "prom-client";
// import { InjectCounter } from "../prom/prom.decorators";
import { UserEditReqDto } from "./dto/req/user.edit.req.dto";
import { UserUserResDto } from "./dto/res/user.user.res.dto";
import { UserEntity } from "./user.entity";
import { UserEntityRepository } from "./user.entity.repository";
// import { UserModule } from "./user.module";

@Injectable()
export class UserService {
  constructor(
    // @InjectCounter("user")
    // private readonly counter: Counter,
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: UserEntityRepository
  ) {}

  async find(): Promise<UserUserResDto[]> {
    // this.counter.inc({
    //   module: UserModule.name,
    //   service: UserService.name,
    //   function: this.find.name
    // });
    return this.userEntityRepository.find();
  }

  async findOneById(id: number): Promise<UserUserResDto | undefined> {
    // this.counter.inc({
    //   module: UserModule.name,
    //   service: UserService.name,
    //   function: this.findOneById.name
    // });
    return this.userEntityRepository.findOne({ id });
  }

  async findOneByTelegramId(
    telegramId: number
  ): Promise<UserEntity | undefined> {
    // this.counter.inc({
    //   module: UserModule.name,
    //   service: UserService.name,
    //   function: this.findOneByTelegramId.name
    // });
    return this.userEntityRepository.findOne({ telegram_id: telegramId });
  }

  async findOneByUsernam(
    username: string
  ): Promise<UserUserResDto | undefined> {
    // this.counter.inc({
    //   module: UserModule.name,
    //   service: UserService.name,
    //   function: this.findOneByUsernam.name
    // });
    return this.userEntityRepository.findOne({ username });
  }

  async get(sub: number): Promise<UserUserResDto | undefined> {
    // this.counter.inc({
    //   module: UserModule.name,
    //   service: UserService.name,
    //   function: this.get.name
    // });
    return this.findOneById(sub);
  }

  async put(dto: UserEditReqDto, sub): Promise<UserUserResDto> {
    // this.counter.inc({
    //   module: UserModule.name,
    //   service: UserService.name,
    //   function: this.put.name
    // });
    return this.save({ ...dto, id: sub });
  }

  async save(dto: UserEntity): Promise<UserUserResDto> {
    // this.counter.inc({
    //   module: UserModule.name,
    //   service: UserService.name,
    //   function: this.save.name
    // });
    return this.userEntityRepository.save(dto);
  }
}
