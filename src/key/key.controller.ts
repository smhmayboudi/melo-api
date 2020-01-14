import {
  Controller,
  Get,
  // Param,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { HttpCacheInterceptor } from "src/Interceptor/http.cache.interceptor";
import { Key } from "./type/key";
// import { KeyEntity } from "./key.entity";
import { KeyService } from "./key.service";

@Controller("key")
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true
  })
)
export class KeyController {
  constructor(private readonly keyService: KeyService) {}

  // @UseInterceptors(HttpCacheInterceptor)
  // @Get()
  // findAll(): Promise<KeyEntity[]> {
  //   return this.keyService.findAll();
  // }

  // @Get(":id")
  // findOne(@Param() id: number): Promise<KeyEntity | undefined> {
  //   return this.keyService.findOne(id);
  // }

  @UseInterceptors(HttpCacheInterceptor)
  @Get("test")
  findAllTest(): Promise<Key[]> {
    return this.keyService.findAllTest();
  }
}
