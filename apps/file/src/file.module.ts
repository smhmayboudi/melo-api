import { FileController } from "./file.controller";
import { FileEntityRepository } from "./file.entity.repository";
import { FileService } from "./file.service";
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
  ],
  providers: [FileService],
})
export class FileModule {}
