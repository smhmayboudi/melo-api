import { FileController } from "./file.controller";
import { FileEntityRepository } from "./file.entity.repository";
import { FileService } from "./file.service";
import { FileTypeOrmOptionsFactory } from "./file.type-orm.options.factory";
import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { memoryStorage } from "multer";

@Module({
  controllers: [FileController],
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),
    TypeOrmModule.forFeature([FileEntityRepository]),
    TypeOrmModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [FileModule],
      useClass: FileTypeOrmOptionsFactory,
    }),
  ],
  providers: [FileService],
})
export class FileModule {}
