import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {
  Controller,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { AppUser } from "../app/app.user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "./file.service";
import { FileUploadImageReqDto } from "./dto/file.upload-image.req.dto";
import { FileUploadImageResDto } from "./dto/file.upload-image.res.dto";

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
  constructor(private readonly fileService: FileService) {}

  @Post("upload/image")
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(FileInterceptor("file"))
  async uploadedPic(
    @AppUser("sub", ParseIntPipe)
    sub: number,
    @UploadedFile("file")
    dto: FileUploadImageReqDto
  ): Promise<FileUploadImageResDto> {
    return this.fileService.uploadImage(sub, dto);
  }
}
