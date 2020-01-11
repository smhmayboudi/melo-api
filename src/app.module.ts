import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import config from "./app.config";
import { AppConfigService } from "./app.config.service";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [AuthModule, ConfigModule.forFeature(config), UserModule],
  controllers: [AppController],
  providers: [AppConfigService, AppService]
})
export class AppModule {}
