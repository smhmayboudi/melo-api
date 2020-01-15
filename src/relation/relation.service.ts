import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { RelationDtoGet } from "./dto/relaton.dto.get";
import { RelationDtoHas } from "./dto/relaton.dto.has";
import { RelationDtoMultiHas } from "./dto/relaton.dto.multi.has";
import { RelationDtoRemove } from "./dto/relaton.dto.remove";
import { RelationDtoSet } from "./dto/relaton.dto.set";
import { RelationConfigService } from "./relation.config.service";
import { EntityRelate } from "./type/EntityRelate";
import { PaginationResult } from "./type/PaginationResult";

@Injectable()
export class RelationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly relationConfigService: RelationConfigService
  ) {}

  get(
    relationDtoGet: RelationDtoGet
  ): Observable<AxiosResponse<PaginationResult>> {
    return this.httpService.get(
      `${this.relationConfigService.uri}/get/${relationDtoGet.fromEntityId}/${relationDtoGet.relType}/${relationDtoGet.limit}`
    );
  }

  has(relationDtoHas: RelationDtoHas): Observable<AxiosResponse<true>> {
    return this.httpService.get(
      `${this.relationConfigService.uri}/has/${relationDtoHas.entityId1}/${relationDtoHas.entityId2}/${relationDtoHas.relType}`
    );
  }

  multiHas(
    relationDtoMultiHas: RelationDtoMultiHas
  ): Observable<AxiosResponse<EntityRelate>> {
    return this.httpService.get(
      `${this.relationConfigService.uri}/multiHas/${relationDtoMultiHas.fromEntityId}/${relationDtoMultiHas.toEntitiesIds}/${relationDtoMultiHas.relType}`
    );
  }

  remove(
    relationDtoRemove: RelationDtoRemove
  ): Observable<AxiosResponse<true>> {
    return this.httpService.post(
      `${this.relationConfigService.uri}/remove`,
      relationDtoRemove
    );
  }

  set(relationDtoSet: RelationDtoSet): Observable<AxiosResponse<true>> {
    return this.httpService.post(
      `${this.relationConfigService.uri}/set`,
      relationDtoSet
    );
  }
}
