import {
  FILE_SERVICE_UPLOAD_IMAGE,
  FileUploadImageReqDto,
  FileUploadImageResDto,
} from "@melo/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { Controller } from "@nestjs/common";
import { FileService } from "./file.service";

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @MessagePattern(FILE_SERVICE_UPLOAD_IMAGE)
  uploadImage(
    @Payload()
    dto: FileUploadImageReqDto
  ): Promise<FileUploadImageResDto> {
    return this.fileService.uploadImage(dto);
  }
}
