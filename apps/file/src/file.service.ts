import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { BadRequestException, Injectable } from "@nestjs/common";
import { FileUploadImageReqDto, FileUploadImageResDto } from "@melo/common";
import { MAGIC_MIME_TYPE, Magic } from "mmmagic";
import { FileEntity } from "./file.entity";
import { FileEntityRepository } from "./file.entity.repository";
import { FileServiceInterface } from "./file.service.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { PromMethodCounter } from "@melo/prom";
import aws from "aws-sdk";
import bluebird from "bluebird";
import mime from "mime-types";
import { v4 as uuidv4 } from "uuid";

@Injectable()
// @PromInstanceCounter
export class FileService implements FileServiceInterface {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileEntityRepository: FileEntityRepository
  ) {
    aws.config.setPromisesDependency(bluebird);
    bluebird.promisifyAll(Magic.prototype);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async uploadImage(
    dto: FileUploadImageReqDto
  ): Promise<FileUploadImageResDto> {
    const newDto = {
      ...dto,
      buffer: Buffer.from(dto.bufferBase64, "base64"),
    };
    const mmmagic = new Magic(MAGIC_MIME_TYPE);
    const mimeType: string = await (mmmagic as any).detectAsync(newDto.buffer);
    if (mimeType !== mime.lookup("jpg")) {
      throw new BadRequestException();
    }
    const extension = mime.extension(mimeType);
    if (extension === false) {
      throw new BadRequestException();
    }
    const s3 = new aws.S3({
      accessKeyId: newDto.config.s3AccessKeyId,
      endpoint: newDto.config.s3Endpoint,
      s3ForcePathStyle: newDto.config.s3ForcePathStyle,
      secretAccessKey: newDto.config.s3SecretAccessKey,
      sslEnabled: newDto.config.s3SslEnabled,
    });
    const managedUpload = await s3
      .upload({
        Body: newDto.buffer,
        Bucket: newDto.config.s3Bucket,
        ContentType: mimeType,
        Key: `${uuidv4()}.${extension}`,
      })
      .promise();
    const file = await this.fileEntityRepository.save({
      bucket: managedUpload.Bucket,
      created_at: new Date(),
      e_tag: managedUpload.ETag,
      file_key: managedUpload.Key,
      id: 0,
      mime_type: mimeType,
      owner_user_id: newDto.sub,
      size: newDto.size,
    });
    return {
      createdAt: file.created_at,
      fileKey: file.file_key,
      mimeType: file.mime_type,
      originalname: newDto.originalname,
      size: file.size,
    };
  }
}
