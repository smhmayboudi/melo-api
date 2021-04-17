import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  CONST_SERVICE,
  CONST_SERVICE_IMAGES,
  ConstImagesReqDto,
  ConstImagesResDto,
} from "@melo/common";

import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ConstServiceInterface } from "./const.service.interface";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class ConstService implements ConstServiceInterface {
  constructor(
    @Inject(CONST_SERVICE) private readonly constClientProxy: ClientProxy
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async images(dto: ConstImagesReqDto): Promise<ConstImagesResDto> {
    return this.constClientProxy
      .send<ConstImagesResDto, ConstImagesReqDto>(CONST_SERVICE_IMAGES, dto)
      .toPromise();
  }
}
