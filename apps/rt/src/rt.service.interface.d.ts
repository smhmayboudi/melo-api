import {
  RtBlockByTokenReqDto,
  RtBlockReqDto,
  RtDeleteByTokenReqDto,
  RtDeleteReqDto,
  RtFindOneByTokenReqDto,
  RtFindOneReqDto,
  RtResDto,
  RtSaveReqDto,
  RtValidateByTokenReqDto,
  RtValidateReqDto,
} from "@melo/common";

import { RtEntity } from "./rt.entity";

export interface RtServiceInterface {
  block(dto: RtBlockReqDto): Promise<RtResDto | undefined>;
  blockByToken(dto: RtBlockByTokenReqDto): Promise<RtResDto | undefined>;
  delete(dto: RtDeleteReqDto): Promise<RtResDto | undefined>;
  deleteByToken(dto: RtDeleteByTokenReqDto): Promise<RtResDto | undefined>;
  find(): Promise<RtResDto[]>;
  findOne(dto: RtFindOneReqDto): Promise<RtResDto | undefined>;
  findOneByToken(dto: RtFindOneByTokenReqDto): Promise<RtResDto | undefined>;
  save(dto: RtSaveReqDto): Promise<RtResDto>;
  validate(dto: RtValidateReqDto): Promise<RtEntity | undefined>;
  validateByToken(dto: RtValidateByTokenReqDto): Promise<RtResDto | undefined>;
}
