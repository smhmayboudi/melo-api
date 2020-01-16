import { CacheModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TokenCacheOptionsFactory } from "./token.cache.options.factory";
import config from "./token.config";
import { TokenConfigService } from "./token.config.service";
import { TokenController } from "./token.controller";
import { TokenEntityRepository } from "./token.entity.repository";
import { TokenService } from "./token.service";

@Module({
  controllers: [TokenController],
  exports: [TokenConfigService, TokenService],
  imports: [
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [TokenModule],
      useClass: TokenCacheOptionsFactory
    }),
    ConfigModule.forFeature(config),
    TypeOrmModule.forFeature([TokenEntityRepository])
  ],
  providers: [TokenConfigService, TokenService]
})
export class TokenModule {}
