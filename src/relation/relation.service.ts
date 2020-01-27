import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map } from "rxjs/operators";
import { EntityDto } from "./dto/entity.dto";
import { EntityMultiHasDto } from "./dto/entity.multi-has.dto";
import { PaginationResultDto } from "./dto/pagination.result.dto";
import { RelationConfigService } from "./relation.config.service";
import { RelationType } from "./type/relation.type";

@Injectable()
export class RelationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly relationConfigService: RelationConfigService
  ) {}

  async get(
    from: number,
    fromEntityDto: EntityDto,
    limit: number,
    relType: RelationType
  ): Promise<PaginationResultDto<EntityDto>> {
    return this.httpService
      .get(
        `${this.relationConfigService.uri}/get/${fromEntityDto.key}/${relType}/${from}/${limit}`
      )
      .pipe(
        map((value: AxiosResponse<PaginationResultDto<EntityDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async has(
    entityDto1: EntityDto,
    entityDto2: EntityDto,
    relType: RelationType
  ): Promise<boolean> {
    return this.httpService
      .get(
        `${this.relationConfigService.uri}/has/${entityDto1.key}/${entityDto2.key}/${relType}`
      )
      .pipe(
        map((value: AxiosResponse<boolean>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async multiHas(
    fromEntityDto: EntityDto,
    toEntityDtos: EntityDto[],
    relType: RelationType
  ): Promise<EntityMultiHasDto> {
    return this.httpService
      .get(
        `${this.relationConfigService.uri}/multiHas/${
          fromEntityDto.key
        }/${toEntityDtos.map(value => value.key).join(",")}/${relType}`
      )
      .pipe(
        map((value: AxiosResponse<EntityMultiHasDto>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async remove(
    entityDto1: EntityDto,
    entityDto2: EntityDto,
    relType: RelationType
  ): Promise<boolean> {
    // TODO: check params
    return this.httpService
      .delete(`${this.relationConfigService.uri}/remove`, {
        params: {
          entityDto1,
          entityDto2,
          relType
        }
      })
      .pipe(
        map((value: AxiosResponse<boolean>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async set(
    createdAt: Date,
    entityDto1: EntityDto,
    entityDto2: EntityDto,
    relType: RelationType
  ): Promise<boolean> {
    // TODO: check params
    return this.httpService
      .post(`${this.relationConfigService.uri}/set`, {
        createdAt,
        entityDto1,
        entityDto2,
        relType
      })
      .pipe(
        map((value: AxiosResponse<boolean>) => {
          return value.data;
        })
      )
      .toPromise();
  }
}
