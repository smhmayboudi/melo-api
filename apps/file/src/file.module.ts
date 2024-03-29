import { ConfigModule } from "@nestjs/config";
import { FileConfigService } from "./file.config.service";
import { FileController } from "./file.controller";
import { FileEntityRepository } from "./file.entity.repository";
import { FileEventsGateway } from "./file.events.gateway";
import { FileMulterOptionsFactory } from "./file.multer.options.factory";
import { FileService } from "./file.service";
import { FileTypeOrmOptionsFactory } from "./file.type-orm.options.factory";
import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "./file.config";

@Module({
  controllers: [FileController],
  exports: [FileConfigService, FileService],
  imports: [
    ConfigModule.forFeature(config),
    ConfigModule.forRoot(),
    MulterModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [FileModule],
      useClass: FileMulterOptionsFactory,
    }),
    TypeOrmModule.forFeature([FileEntityRepository]),
    TypeOrmModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [FileModule],
      useClass: FileTypeOrmOptionsFactory,
    }),
  ],
  providers: [FileConfigService, FileEventsGateway, FileService],
})
export class FileModule {}
