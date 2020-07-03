import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {
  BadRequestException,
  Controller,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseGuards,
  // UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { FileUploadImageReqDto, FileUploadImageResDto } from "@melo/common";

import { AppUser } from "../app/app.user.decorator";
import { AuthGuard } from "@nestjs/passport";
// import { FileInterceptor } from "@nestjs/platform-fastify";
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
  constructor(private readonly fileService: FileService) {}

  @Post("upload/image")
  @UseGuards(AuthGuard("jwt"))
  // @UseInterceptors(FileInterceptor("file"))
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
      sub,
    });
  }
}
