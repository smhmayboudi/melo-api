import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppModule } from "../app.module";
import config from "./jwks.config";
import { JwksEntityRepository } from "./jwks.entity.repository";
import { JwksService } from "./jwks.service";

describe("JwksService", () => {
  let service: JwksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => AppModule),
        ConfigModule.forFeature(config),
        TypeOrmModule.forFeature([JwksEntityRepository])
      ],
      providers: [JwksService]
    }).compile();

    service = module.get<JwksService>(JwksService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("findOneById");
  test.todo("getOneRandom");
});
