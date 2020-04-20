import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";
import { BadRequestException, Injectable } from "@nestjs/common";
import { MAGIC_MIME_TYPE, Magic } from "mmmagic";

import { FileConfigService } from "./file.config.service";
import { FileEntity } from "./file.entity";
import { FileEntityRepository } from "./file.entity.repository";
import { FileFileReqDto } from "./dto/req/file.file.req.dto";
import { FileFileResDto } from "./dto/res/file.file.res.dto";
import { FileServiceInterface } from "./file.service.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { PromMethodCounter } from "../prom/prom.decorator";
import aws from "aws-sdk";
import bluebird from "bluebird";
import mime from "mime-types";
import { v4 as uuidv4 } from "uuid";

@Injectable()
// @PromInstanceCounter
export class FileService implements FileServiceInterface {
  private readonly mmmagic: Magic;
  private readonly s3: aws.S3;

  constructor(
    private readonly fileConfigService: FileConfigService,
    @InjectRepository(FileEntity)
    private readonly fileEntityRepository: FileEntityRepository
  ) {
    bluebird.promisifyAll(Magic.prototype);
    this.mmmagic = new Magic(MAGIC_MIME_TYPE);
    aws.config.setPromisesDependency(bluebird);
    this.s3 = new aws.S3({
      accessKeyId: this.fileConfigService.s3AccessKeyId,
      endpoint: this.fileConfigService.s3Endpoint,
      s3ForcePathStyle: true,
      secretAccessKey: this.fileConfigService.s3SecretAccessKey,
      sslEnabled: this.fileConfigService.s3SslEnabled,
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async uploadImage(
    sub: number,
    dto?: FileFileReqDto
  ): Promise<FileFileResDto> {
    if (dto === undefined) {
      throw new BadRequestException();
    }
    const mimeType: string = await (this.mmmagic as any).detectAsync(
      dto.buffer
    );
    if (mimeType !== mime.lookup("jpg")) {
      throw new BadRequestException();
    }
    const extension = mime.extension(mimeType);
    if (extension === false) {
      throw new BadRequestException();
    }
    const managedUpload = await this.s3
      .upload({
        Body: dto.buffer,
        Bucket: this.fileConfigService.s3Bucket,
        ContentType: mimeType,
        Key: `${uuidv4()}.${extension}`,
      })
      .promise();
    const fileEntity = await this.fileEntityRepository.save({
      bucket: managedUpload.Bucket,
      created_at: new Date(),
      e_tag: managedUpload.ETag,
      file_key: managedUpload.Key,
      id: 0,
      mime_type: mimeType,
      owner_user_id: sub,
      size: dto.size,
    });
    return {
      createdAt: fileEntity.created_at,
      fileKey: fileEntity.file_key,
      mimeType: fileEntity.mime_type,
      originalname: dto.originalname,
      size: fileEntity.size,
    };
  }
}
