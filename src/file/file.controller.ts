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
import { FileUploadImageDto } from "./dto/file.upload.image.dto";
import { FileEntity } from "./file.entity";
import { FileService } from "./file.service";

@ApiBearerAuth("jwt")
@ApiTags("file")
@Controller("file")
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
    @User("sub", ParseIntPipe) sub: number,
    @UploadedFile("file")
    dto: FileUploadImageDto
  ): Promise<FileEntity> {
    return this.fileService.uploadImage(dto, sub);
  }
}
