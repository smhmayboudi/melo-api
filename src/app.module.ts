import { CacheModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppCacheOptionsFactory } from "./app.cache.options.factory";
import config from "./app.config";
import { AppConfigService } from "./app.config.service";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AppTypeOrmOptionsFactory } from "./app.type.orm.options.factory";
import { AuthModule } from "./auth/auth.module";
import { DataModule } from "./data/data.module";
import { JwksModule } from "./jwks/jwks.module";
import { RelationModule } from "./relation/relation.module";
import { UserModule } from "./user/user.module";
import { TokenModule } from "./token/token.module";

@Module({
  controllers: [AppController],
  exports: [AppConfigService, AppService],
  imports: [
    AuthModule,
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [AppModule],
      useClass: AppCacheOptionsFactory
    }),
    ConfigModule.forFeature(config),
    DataModule,
    JwksModule,
    RelationModule,
    TypeOrmModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [AppModule],
      useClass: AppTypeOrmOptionsFactory
    }),
    UserModule,
    TokenModule
  ],
  providers: [AppConfigService, AppService]
})
export class AppModule {}
