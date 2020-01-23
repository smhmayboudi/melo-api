import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  Request,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import * as express from "express";
import { JwtPayloadDto } from "src/auth/dto/jwt.payload.dto";
import { HttpExceptionFilter } from "../filter/http.exception.filter";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { FileUploadImageDto } from "./dto/file.upload.image.dto";
import { FileEntity } from "./file.entity";
import { FileService } from "./file.service";

@ApiBearerAuth("jwt")
@ApiTags("file")
@Controller("file")
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthGuard("jwt"))
@UseInterceptors(ClassSerializerInterceptor, ErrorInterceptor)
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true
  })
)
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post("upload/image")
  @UseInterceptors(FileInterceptor("file"))
  async uploadedPic(
    @Request() request: express.Request & { user: JwtPayloadDto },
    @UploadedFile()
    dto: FileUploadImageDto
  ): Promise<FileEntity> {
    return this.fileService.uploadImage(dto, request.user.sub);
  }
}
