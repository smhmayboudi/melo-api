import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map } from "rxjs/operators";
import { EntityDto } from "./dto/entity.dto";
import { EntityRelateDto } from "./dto/entity.relate.dto";
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
        `${this.relationConfigService.uri}/get/${dto.fromEntityId}/${dto.relType}/${dto.limit}`
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
        `${this.relationConfigService.uri}/has/${dto.entityId1}/${dto.entityId2}/${dto.relType}`
      )
      .pipe(
        map((value: AxiosResponse<boolean>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async multiHas(dto: RelationMultiHasDto): Promise<EntityRelateDto> {
    return this.httpService
      .get(
        `${this.relationConfigService.uri}/multiHas/${dto.fromEntityId}/${dto.toEntitiesIds}/${dto.relType}`
      )
      .pipe(
        map((value: AxiosResponse<EntityRelateDto>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async remove(dto: RelationRemoveDto): Promise<boolean> {
    return this.httpService
      .post(`${this.relationConfigService.uri}/remove`, dto)
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
