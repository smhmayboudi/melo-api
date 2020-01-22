import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FileUploadImageDto } from "./dto/file.upload.image.dto";
import { FileEntity } from "./file.entity";
import { FileEntityRepository } from "./file.entity.repository";
import { S3 } from "aws-sdk";
import { v4 } from "uuid";
import { Magic, MAGIC_MIME_TYPE } from "mmmagic";
import * as mime from "mime-types";
import { FileConfigService } from "./file.config.service";
// import { User } from "aws-sdk/clients/appstream";
// import { JwtPayloadDto } from "src/auth/dto/jwt.payload.dto";

@Injectable()
export class FileService {
  private readonly mmmagic: Magic;
  private readonly s3: S3;
  constructor(
    private readonly fileConfigService: FileConfigService,
    @InjectRepository(FileEntity)
    private readonly fileEntityRepository: FileEntityRepository,
  ) {
    this.s3 = new S3({
      accessKeyId: this.fileConfigService.accessKeyId,
      secretAccessKey: this.fileConfigService.secretAccessKey,
      endpoint: "localhost:9000",//TODO
      sslEnabled: this.fileConfigService.sslEnabled,
      s3ForcePathStyle: true,
    })
    this.mmmagic = new Magic(MAGIC_MIME_TYPE)
  }

  async uploadImage(dto: FileUploadImageDto, userId: string) {

    return new Promise((_resolve: (result: any) => void, _reject: (err: any) => void): void => {
      return this.mmmagic.detect(dto.buffer, (err: Error, mimeType: string) => {
        if (err) {
          throw err;
        }
        let extension = mime.extension(mimeType);
        if (!extension) {
          throw new Error("extension is not available.")
        }
        if (extension === "jpeg") {
          extension = "jpg";
        }
        const fileId: string = v4();
        const fileName: string = `${fileId}.${extension}`;
        return this.s3.upload({ Bucket: this.fileConfigService.storageMiscBucket, Key: fileName, Body: dto.buffer, ContentType: mimeType }
          , (err: Error, _result: S3.ManagedUpload.SendData) => {

            if (err) {
              throw err;
            }
            return this.fileEntityRepository.save({
              created_at: new Date(),
              file_id: fileId,
              file_name: dto.originalname,
              id: 0,
              mime_type: dto.mimetype,
              owner_user_id: Number(userId),
              size: dto.size
            });
          });
      });
    });
  }
}
