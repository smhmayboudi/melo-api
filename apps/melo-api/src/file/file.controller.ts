import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {
  BadRequestException,
  Controller,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  FileConfigReqDto,
  FileUploadImageReqDto,
  FileUploadImageResDto,
} from "@melo/common";

import { AppUser } from "../app/app.user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { FileConfigService } from "./file.config.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "./file.service";

@ApiBearerAuth("jwt")
@ApiTags("file")
@Controller("file")
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
  })
)
export class FileController {
  private config: FileConfigReqDto = {
    s3AccessKeyId: this.fileConfigService.s3AccessKeyId,
    s3Bucket: this.fileConfigService.s3Bucket,
    s3Endpoint: this.fileConfigService.s3Endpoint,
    s3ForcePathStyle: this.fileConfigService.s3ForcePathStyle,
    s3SecretAccessKey: this.fileConfigService.s3SecretAccessKey,
    s3SslEnabled: this.fileConfigService.s3SslEnabled,
  };

  constructor(
    private readonly fileConfigService: FileConfigService,
    private readonly fileService: FileService
  ) {}

  @Post("upload/image")
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(FileInterceptor("file"))
  async uploadImage(
    @AppUser("sub", ParseIntPipe)
    sub: number,
    @UploadedFile("file")
    dto: FileUploadImageReqDto
  ): Promise<FileUploadImageResDto> {
    if (dto === undefined || dto.buffer === undefined) {
      throw new BadRequestException();
    }
    const { buffer, ...newDto } = dto;
    return this.fileService.uploadImage({
      ...newDto,
      bufferBase64: buffer.toString("base64"),
      config: this.config,
      sub,
    });
  }
}
