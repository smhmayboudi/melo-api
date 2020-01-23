import { Injectable } from "@nestjs/common";
import {
  MulterModuleOptions,
  MulterOptionsFactory
} from "@nestjs/platform-express";
import { memoryStorage } from "multer";

@Injectable()
export class FileMulterOptionsFactory implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: memoryStorage()
    };
  }
}
