import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  FILE_SERVICE,
  FILE_SERVICE_UPLOAD_IMAGE,
  FileUploadImageReqDto,
  FileUploadImageResDto,
} from "@melo/common";
import { Inject, Injectable } from "@nestjs/common";

import { ClientProxy } from "@nestjs/microservices";
import { FileServiceInterface } from "./file.service.interface";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class FileService implements FileServiceInterface {
  constructor(
    @Inject(FILE_SERVICE) private readonly fileClientProxy: ClientProxy
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async uploadImage(
    dto: FileUploadImageReqDto
  ): Promise<FileUploadImageResDto> {
    return this.fileClientProxy
      .send<FileUploadImageResDto, FileUploadImageReqDto>(
        FILE_SERVICE_UPLOAD_IMAGE,
        dto
      )
      .toPromise();
  }
}
