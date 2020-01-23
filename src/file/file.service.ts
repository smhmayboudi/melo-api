import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as aws from "aws-sdk";
import * as bluebird from "bluebird";
import * as mime from "mime-types";
import { Magic, MAGIC_MIME_TYPE } from "mmmagic";
import * as uuidv4 from "uuid/v4";
import { FileUploadImageDto } from "./dto/file.upload.image.dto";
import { FileConfigService } from "./file.config.service";
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
      accessKeyId: this.fileConfigService.accessKeyId,
      secretAccessKey: this.fileConfigService.secretAccessKey,
      endpoint: this.fileConfigService.endpoint,
      sslEnabled: this.fileConfigService.sslEnabled,
      s3ForcePathStyle: true
    });
  }

  async uploadImage(
    dto: FileUploadImageDto,
    userId: string
  ): Promise<FileEntity> {
    const mimeType: string = await (this.mmmagic as any).detectAsync(
      dto.buffer
    );
    if (mimeType !== mime.lookup("jpeg")) {
      const msg = "Mimetype is not valid.";
      Logger.log(msg, "file.controller");
      throw new Error(msg);
    }
    const extension = mime.extension(mimeType);
    if (extension === undefined) {
      throw new Error("Contentt type is not suported.");
    }
    const sendData = await this.s3
      .upload({
        Body: dto.buffer,
        Bucket: this.fileConfigService.bucket,
        ContentType: mimeType,
        Key: `${uuidv4()}.${extension}`
      })
      .promise();
    return this.fileEntityRepository.save({
      created_at: new Date(),
      file_id: sendData.Key,
      file_name: dto.originalname,
      id: 0,
      mime_type: mimeType,
      owner_user_id: Number(userId),
      size: dto.size
    });
  }
}
