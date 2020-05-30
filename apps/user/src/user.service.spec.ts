import { Test, TestingModule } from "@nestjs/testing";
import {
  UserEditReqDto,
  UserFindOneByTelegramIdReqDto,
  UserFindOneByUsernameReqDto,
  UserFindOneReqDto,
  UserGetReqDto,
  UserResDto,
  UserSaveReqDto,
} from "@melo/common";

import { UserEntity } from "./user.entity";
import { UserEntityRepository } from "./user.entity.repository";
import { UserEntityRepositoryInterface } from "./user.entity.repository.interface";
import { UserService } from "./user.service";

describe("UserService", () => {
  const userEntity: UserResDto = {
    id: 0,
  };

  const userEntityRepositoryMock: UserEntityRepositoryInterface = {
    find: (): Promise<UserEntity[]> => Promise.resolve([userEntity]),
    findOne: (): Promise<UserEntity | undefined> => Promise.resolve(userEntity),
    save: <UserEntity>(): Promise<UserEntity> =>
      (Promise.resolve(userEntity) as unknown) as Promise<UserEntity>,
  };

  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserEntityRepository, useValue: userEntityRepositoryMock },
      ],
    }).compile();
    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("find should be equal to an array of users", async () => {
    expect(await service.find()).toEqual([userEntity]);
  });

  it("findOne should be equal to a users", async () => {
    const dto: UserFindOneReqDto = {
      id: 0,
    };
    expect(await service.findOne(dto)).toEqual(userEntity);
  });

  it("findOneByTelegramId should be equal to a users", async () => {
    const dto: UserFindOneByTelegramIdReqDto = {
      telegramId: 0,
    };
    expect(await service.findOneByTelegramId(dto)).toEqual(userEntity);
  });

  it("findOneByUsername should be equal to a users", async () => {
    const dto: UserFindOneByUsernameReqDto = {
      username: "",
    };
    expect(await service.findOneByUsername(dto)).toEqual(userEntity);
  });

  it("get should be equal to a users", async () => {
    const dto: UserGetReqDto = {
      sub: 1,
    };
    expect(await service.get(dto)).toEqual(userEntity);
  });

  it("edit should be equal to a users", async () => {
    const dto: UserEditReqDto = {
      sub: 1,
    };
    expect(await service.edit(dto)).toEqual(userEntity);
  });

  it("save should be equal to a users", async () => {
    const dto: UserSaveReqDto = {
      id: 0,
      telegramId: 0,
    };
    expect(await service.save(dto)).toEqual(userEntity);
  });
});
