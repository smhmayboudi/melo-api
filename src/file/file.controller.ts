import {
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
import { AppUser } from "../app/app.user.decorator";
import { FileUploadImageReqDto } from "./dto/file.upload-image.req.dto";
import { FileUploadImageResDto } from "./dto/file.upload-image.res.dto";
import { FileService } from "./file.service";

@ApiBearerAuth("jwt")
@ApiTags("file")
@Controller("file")
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
    @UploadedFile("file")
    dto: FileUploadImageReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<FileUploadImageResDto> {
    return this.fileService.uploadImage(dto, sub);
  }
}
