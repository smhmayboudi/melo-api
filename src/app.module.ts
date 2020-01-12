import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import config from "./app.config";
import { AppConfigService } from "./app.config.service";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";

@Module({
  controllers: [AppController],
  exports: [AppConfigService, AppService],
  imports: [AuthModule, ConfigModule.forFeature(config), UserModule],
  providers: [AppConfigService, AppService]
})
export class AppModule {}
