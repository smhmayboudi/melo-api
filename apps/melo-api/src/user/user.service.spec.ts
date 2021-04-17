import {
  USER_SERVICE,
  USER_SERVICE_FIND,
  UserEditReqDto,
  UserGetReqDto,
  UserResDto,
} from "@melo/common";

import { Test } from "@nestjs/testing";
import { UserService } from "./user.service";
import { of } from "rxjs";

describe("UserService", () => {
  const user: UserResDto = {
    id: 0,
    telegram_id: 0,
  };

  // TODO: interface ?
  const userClientProxyMock = {
    send: (token: string) =>
      token === USER_SERVICE_FIND ? of([user]) : of(user),
  };

  let service: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: USER_SERVICE, useValue: userClientProxyMock },
        UserService,
      ],
    }).compile();
    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("find should return an array of users", async () => {
    expect(await service.find()).toEqual([user]);
  });

  it("get should return a users", async () => {
    const dto: UserGetReqDto = {
      sub: 1,
    };
    expect(await service.get(dto)).toEqual(user);
  });

  it("edit should return a users", async () => {
    const dto: UserEditReqDto = {
      sub: 1,
    };
    expect(await service.edit(dto)).toEqual(user);
  });
});
