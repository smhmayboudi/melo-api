import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppModule } from "../app.module";
import config from "./at.config";
import { AtEntityRepository } from "./at.entity.repository";
import { AtService } from "./at.service";

describe("AtService", () => {
  let service: AtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => AppModule),
        ConfigModule.forFeature(config),
        TypeOrmModule.forFeature([AtEntityRepository])
      ],
      providers: [AtService]
    }).compile();

    service = module.get<AtService>(AtService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("deleteById");
  test.todo("deleteByAt");
  test.todo("find");
  test.todo("findOneById");
  test.todo("findOneByAt");
  test.todo("save");
  test.todo("update");
  test.todo("validateBySub");
  test.todo("validateByAt");
});
