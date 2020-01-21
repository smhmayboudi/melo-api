import { CacheModule, forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppModule } from "../app.module";
import { ActionCacheOptionsFactory } from "./action.cache.options.factory";
import config from "./action.config";
import { ActionConfigService } from "./action.config.service";
import { ActionEntityRepository } from "./action.entity.repository";
import { ActionController } from "./action.controller";
import { ActionService } from "./action.service";

@Module({
  controllers: [ActionController],
  exports: [ActionConfigService, ActionService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [ActionModule],
      useClass: ActionCacheOptionsFactory
    }),
    ConfigModule.forFeature(config),
    TypeOrmModule.forFeature([ActionEntityRepository])
  ],
  providers: [ActionConfigService, ActionService]
})
export class ActionModule {}
