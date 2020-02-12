import { CounterMetric, InjectCounterMetric } from "@digikare/nestjs-prom";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import aws from "aws-sdk";
import bluebird from "bluebird";
import mime from "mime-types";
import { Magic, MAGIC_MIME_TYPE } from "mmmagic";
import uuidv4 from "uuid/v4";
import { FileUploadImageReqDto } from "./dto/file.upload-image.req.dto";
import { FileUploadImageResDto } from "./dto/file.upload-image.res.dto";
import { FileConfigService } from "./file.config.service";
import { FileEntity } from "./file.entity";
import { FileEntityRepository } from "./file.entity.repository";

@Injectable()
export class FileService {
  private readonly mmmagic: Magic;
  private readonly s3: aws.S3;

  constructor(
    @InjectCounterMetric("file_counter")
    private readonly counterMetric: CounterMetric,
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
    dto: FileUploadImageReqDto,
    sub: number
  ): Promise<FileUploadImageResDto> {
    this.counterMetric.inc(
      { module: "file", service: "file", function: "uploadImage" },
      1,
      Date.now()
    );
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
    if (extension === undefined) {
      throw new BadRequestException();
    }
    const managedUpload = await this.s3
      .upload({
        Body: dto.buffer,
        Bucket: this.fileConfigService.s3Bucket,
        ContentType: mimeType,
        Key: `${uuidv4()}.${extension}`
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
      size: dto.size
    });
    return {
      createdAt: fileEntity.created_at,
      fileKey: fileEntity.file_key,
      mimeType: fileEntity.mime_type,
      originalname: dto.originalname,
      size: fileEntity.size
    };
  }
}
