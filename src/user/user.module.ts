import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import config from "./user.config";
import { UserConfigService } from "./user.config.service";
import { UserService } from "./user.service";

@Module({
  exports: [UserService],
  imports: [ConfigModule.forFeature(config)],
  providers: [UserConfigService, UserService]
})
export class UserModule {}
