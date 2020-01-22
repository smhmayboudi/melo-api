import { Injectable } from "@nestjs/common";
import {
  MulterModuleOptions,
  MulterOptionsFactory
} from "@nestjs/platform-express";
// import { FileConfigService } from "./file.config.service";
import { memoryStorage } from "multer"

@Injectable()
export class FileMulterOptionsFactory implements MulterOptionsFactory {
  // constructor(private readonly fileConfigService: FileConfigService) {}

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: memoryStorage()
    };
  }
}
