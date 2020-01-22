import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  Request,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  UploadedFile
} from "@nestjs/common";
import * as express from "express";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "../filter/http.exception.filter";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { FileUploadImageDto } from "./dto/file.upload.image.dto";
import { FileService } from "./file.service";
import { JwtPayloadDto } from "src/auth/dto/jwt.payload.dto";

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
  constructor(private readonly fileService: FileService) { }

  @Post("upload/image")
  @UseInterceptors(
    FileInterceptor('file')
  )
  async uploadedPic(
    @Request() request: express.Request & { user: JwtPayloadDto },
    @UploadedFile()
    file: FileUploadImageDto
  ) {
    return this.fileService.uploadImage(file, request.user.sub);
  }
}
