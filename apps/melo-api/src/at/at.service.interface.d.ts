import {
  AtDeleteByTokenReqDto,
  AtDeleteReqDto,
  AtFindOneByTokenReqDto,
  AtFindOneReqDto,
  AtResDto,
  AtValidateByTokenReqDto,
  AtValidateReqDto,
} from "@melo/common";
import { DeleteResult, UpdateResult } from "typeorm";

export interface AtServiceInterface {
  delete(dto: AtDeleteReqDto): Promise<DeleteResult>;
  deleteByToken(dto: AtDeleteByTokenReqDto): Promise<DeleteResult>;
  find(): Promise<AtResDto[]>;
  findOne(dto: AtFindOneReqDto): Promise<AtResDto | undefined>;
  findOneByToken(dto: AtFindOneByTokenReqDto): Promise<AtResDto | undefined>;
  save(entity: AtResDto): Promise<AtResDto>;
  update(entity: AtResDto): Promise<UpdateResult>;
  validate(dto: AtValidateReqDto): Promise<AtResDto | undefined>;
  validateByToken(dto: AtValidateByTokenReqDto): Promise<AtResDto | undefined>;
}
