import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as aws from "aws-sdk";
import * as bluebird from "bluebird";
import * as mime from "mime-types";
import { Magic, MAGIC_MIME_TYPE } from "mmmagic";
import * as uuidv4 from "uuid/v4";
import { FileUploadImageDto } from "./dto/file.upload.image.dto";
import { FileConfigService } from "./file.config.service";
import { fileConstant } from "./file.constant";
import { FileEntity } from "./file.entity";
import { FileEntityRepository } from "./file.entity.repository";

@Injectable()
export class FileService {
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
      secretAccessKey: this.fileConfigService.s3SecretAccessKey,
      endpoint: this.fileConfigService.s3Endpoint,
      sslEnabled: this.fileConfigService.s3SslEnabled,
      s3ForcePathStyle: true
    });
  }

  async uploadImage(
    dto: FileUploadImageDto,
    userId: string
  ): Promise<FileEntity> {
    if (dto === undefined) {
      Logger.error(fileConstant.errors.dtoValidation, "file.controller");
      throw new Error(fileConstant.errors.dtoValidation);
    }
    const mimeType: string = await (this.mmmagic as any).detectAsync(
      dto.buffer
    );
    if (mimeType !== mime.lookup("jpeg")) {
      Logger.error(fileConstant.errors.mimeTypeValidatoion, "file.controller");
      throw new Error(fileConstant.errors.mimeTypeValidatoion);
    }
    const extension = mime.extension(mimeType);
    if (extension === undefined) {
      Logger.error(fileConstant.errors.extensionValidatoion, "file.controller");
      throw new Error(fileConstant.errors.extensionValidatoion);
    }
    const sendData = await this.s3
      .upload({
        Body: dto.buffer,
        Bucket: this.fileConfigService.s3Bucket,
        ContentType: mimeType,
        Key: `${uuidv4()}.${extension}`
      })
      .promise();
    return this.fileEntityRepository.save({
      bucket: sendData.Bucket,
      created_at: new Date(),
      e_tag: sendData.ETag,
      file_name: sendData.Key,
      id: 0,
      mime_type: mimeType,
      owner_user_id: Number(userId),
      size: dto.size
    });
  }
}
