import { ClientsModule, Transport } from "@nestjs/microservices";
import { Module, forwardRef } from "@nestjs/common";

import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import { FILE_SERVICE } from "@melo/common";
// import { FileCacheOptionsFactory } from "./file.cache.options.factory";
import { FileConfigService } from "./file.config.service";
import { FileController } from "./file.controller";
import { FileHealthIndicator } from "./file.health.indicator";
// import { FileMulterOptionsFactory } from "./file.multer.options.factory";
import { FileService } from "./file.service";
// import { MulterModule } from "@nestjs/platform-fastify";
import config from "./file.config";

@Module({
  controllers: [FileController],
  exports: [FileConfigService, FileHealthIndicator, FileService],
  imports: [
    forwardRef(() => AppModule),
    // CacheModule.registerAsync({
    //   // eslint-disable-next-line @typescript-eslint/no-use-before-define
    //   imports: [FileModule],
    //   useClass: FileCacheOptionsFactory,
    // }),
    ClientsModule.register([
      {
        name: FILE_SERVICE,
        options: {
          url: process.env.FILE_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
    ]),
    ConfigModule.forFeature(config),
    // MulterModule.registerAsync({
    //   // eslint-disable-next-line @typescript-eslint/no-use-before-define
    //   imports: [FileModule],
    //   useClass: FileMulterOptionsFactory,
    // }),
  ],
  providers: [FileConfigService, FileHealthIndicator, FileService],
})
export class FileModule {}
