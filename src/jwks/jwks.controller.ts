import {
  Controller,
  Get,
  // Param,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { HttpCacheInterceptor } from "src/interceptor/http.cache.interceptor";
import { Jwks } from "./type/jwks";
// import { JwksEntity } from "./jwks.entity";
import { JwksService } from "./jwks.service";

@Controller("jwks")
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true
  })
)
export class JwksController {
  constructor(private readonly jwksService: JwksService) {}

  // @UseInterceptors(HttpCacheInterceptor)
  // @Get()
  // findAll(): Promise<JwksEntity[]> {
  //   return this.jwksService.findAll();
  // }

  // @Get(":id")
  // findOne(@Param() id: number): Promise<JwksEntity | undefined> {
  //   return this.jwksService.findOne(id);
  // }

  @UseInterceptors(HttpCacheInterceptor)
  @Get("test")
  findAllTest(): Promise<Jwks[]> {
    return this.jwksService.findAllTest();
  }
}
