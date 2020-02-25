import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppConfigService } from "../app/app.config.service";
import { AppModule } from "../app/app.module";
import config from "./rt.config";
import { RtEntityRepository } from "./rt.entity.repository";
import { RtService } from "./rt.service";

describe("RtService", () => {
  let service: RtService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => AppModule),
        ConfigModule.forFeature(config),
        TypeOrmModule.forFeature([RtEntityRepository])
      ],
      providers: [AppConfigService, RtService]
    }).compile();

    service = module.get<RtService>(RtService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("blockById");
  test.todo("blockByToken");
  test.todo("deleteById");
  test.todo("deleteByToken");
  test.todo("find");
  test.todo("findOneById");
  test.todo("findOneByToken");
  test.todo("save");
  test.todo("validateBySub");
  test.todo("validateByToken");
});
