import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { TagConfigService } from "./tag.config.service";
import { TagController } from "./tag.controller";
import { TagEntityRepository } from "./tag.entity.repository";
import { TagEventsGateway } from "./tag.events.gateway";
import { TagRelationEntityRepository } from "./tag-relation.entity.repository";
import { TagService } from "./tag.service";
import { TagTypeOrmOptionsFactory } from "./tag.type-orm.options.factory";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "./tag.config";

@Module({
  controllers: [TagController],
  exports: [TagConfigService, TagService],
  imports: [
    ConfigModule.forFeature(config),
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      TagEntityRepository,
      TagRelationEntityRepository,
    ]),
    TypeOrmModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [TagModule],
      useClass: TagTypeOrmOptionsFactory,
    }),
  ],
  providers: [TagConfigService, TagEventsGateway, TagService],
})
export class TagModule {}
