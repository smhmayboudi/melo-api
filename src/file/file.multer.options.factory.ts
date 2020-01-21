import { Injectable } from "@nestjs/common";
import {
  MulterModuleOptions,
  MulterOptionsFactory
} from "@nestjs/platform-express";
import { FileConfigService } from "./file.config.service";

@Injectable()
export class FileMulterOptionsFactory implements MulterOptionsFactory {
  constructor(private readonly fileConfigService: FileConfigService) {}

  createMulterOptions(): MulterModuleOptions {
    return {
      // dest: "/upload"
      storage: this.fileConfigService.storage
    };
  }
}
