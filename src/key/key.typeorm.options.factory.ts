import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { KeyConfigService } from "./key.config.service";
import { KeyEntity } from "./key.entity";

@Injectable()
export class AuthTypeOrmOptionsFactory implements TypeOrmOptionsFactory {
  constructor(private readonly keyConfigService: KeyConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      database: this.keyConfigService.typeOrmDatabase,
      entities: [KeyEntity],
      host: this.keyConfigService.typeOrmHost,
      logging: this.keyConfigService.typeOrmLogging,
      password: this.keyConfigService.typeOrmPassword,
      port: this.keyConfigService.typeOrmPort,
      synchronize: this.keyConfigService.typeOrmSynchronize,
      type: "mariadb",
      username: this.keyConfigService.typeOrmUsername
    };
  }
}
