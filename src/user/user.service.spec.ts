import { Test, TestingModule } from "@nestjs/testing";
import { UserEditReqDto } from "./dto/req/user.edit.req.dto";
import { UserSaveReqDto } from "./dto/req/user.save.req.dto";
import { UserEntity } from "./user.entity";
import { UserEntityRepository } from "./user.entity.repository";
import { UserEntityRepositoryInterface } from "./user.entity.repository.interface";
import { UserService } from "./user.service";

describe("UserService", () => {
  const userEntity: UserEntity = {
    id: 0
  };

  const userEntityRepositoryMock: UserEntityRepositoryInterface = {
    find: (): Promise<UserEntity[]> => Promise.resolve([userEntity]),
    findOne: (): Promise<UserEntity | undefined> => Promise.resolve(userEntity),
    save: <UserEntity>(): Promise<UserEntity> =>
      (Promise.resolve(userEntity) as unknown) as Promise<UserEntity>
  };

  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: UserEntityRepository, useValue: userEntityRepositoryMock },
        UserService
      ]
    }).compile();
    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("find should return an array of users", async () => {
    expect(await service.find()).toEqual([userEntity]);
  });

  it("findOneById should return a users", async () => {
    expect(await service.findOneById(0)).toEqual(userEntity);
  });

  it("findOneByTelegramId should return a users", async () => {
    expect(await service.findOneByTelegramId(0)).toEqual(userEntity);
  });

  it("findOneByUsernam should return a users", async () => {
    expect(await service.findOneByUsernam("")).toEqual(userEntity);
  });

  it("get should return a users", async () => {
    expect(await service.get(0)).toEqual(userEntity);
  });

  it("put should return a users", async () => {
    const dto: UserEditReqDto = {};
    expect(await service.put(dto, {})).toEqual(userEntity);
  });

  it("save should return a users", async () => {
    const dto: UserSaveReqDto = {
      id: 0,
      telegramId: 0
    };
    expect(await service.save(dto)).toEqual(userEntity);
  });
});
