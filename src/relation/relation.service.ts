import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map } from "rxjs/operators";
import { EntityDto } from "./dto/entity.dto";
import { EntityMultiHasDto } from "./dto/entity.multi-has.dto";
import { PaginationResultDto } from "./dto/pagination.result.dto";
import { RelationGetDto } from "./dto/relaton.get.dto";
import { RelationHasDto } from "./dto/relaton.has.dto";
import { RelationMultiHasDto } from "./dto/relaton.multi.has.dto";
import { RelationRemoveDto } from "./dto/relaton.remove.dto";
import { RelationSetDto } from "./dto/relaton.set.dto";
import { RelationConfigService } from "./relation.config.service";

@Injectable()
export class RelationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly relationConfigService: RelationConfigService
  ) {}

  async get(dto: RelationGetDto): Promise<PaginationResultDto<EntityDto>> {
    return this.httpService
      .get(
        `${this.relationConfigService.uri}/get/${dto.fromEntityDto.key}/${dto.relType}/${dto.limit}`
      )
      .pipe(
        map((value: AxiosResponse<PaginationResultDto<EntityDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async has(dto: RelationHasDto): Promise<boolean> {
    return this.httpService
      .get(
        `${this.relationConfigService.uri}/has/${dto.entityDto1.key}/${dto.entityDto2.key}/${dto.relType}`
      )
      .pipe(
        map((value: AxiosResponse<boolean>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async multiHas(dto: RelationMultiHasDto): Promise<EntityMultiHasDto> {
    return this.httpService
      .get(
        `${this.relationConfigService.uri}/multiHas/${dto.fromEntityDto.key}/${dto.keys}/${dto.relType}`
      )
      .pipe(
        map((value: AxiosResponse<EntityMultiHasDto>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async remove(dto: RelationRemoveDto): Promise<boolean> {
    return this.httpService
      .delete(`${this.relationConfigService.uri}/remove`, {
        params: dto
      })
      .pipe(
        map((value: AxiosResponse<boolean>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async set(dto: RelationSetDto): Promise<boolean> {
    return this.httpService
      .post(`${this.relationConfigService.uri}/set`, dto)
      .pipe(
        map((value: AxiosResponse<boolean>) => {
          return value.data;
        })
      )
      .toPromise();
  }
}
