import {
  ClassSerializerInterceptor,
  Controller,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "../decorator/user.decorator";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { FileUploadImageReqDto } from "./dto/file.upload-image.req.dto";
import { FileUploadImageResDto } from "./dto/file.upload-image.res.dto";
import { FileService } from "./file.service";

@ApiBearerAuth("jwt")
@ApiTags("file")
@Controller("file")
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
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(FileInterceptor("file"))
  async uploadedPic(
    @User("sub", ParseIntPipe) sub: number,
    @UploadedFile("file")
    dto: FileUploadImageReqDto
  ): Promise<FileUploadImageResDto> {
    return this.fileService.uploadImage(dto, sub);
  }
}
