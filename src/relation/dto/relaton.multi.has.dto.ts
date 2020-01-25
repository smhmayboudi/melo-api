import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, ValidateNested } from "class-validator";
import { RelationType } from "../type/relation.type";
import { EntityDto } from "./entity.dto";
import { Exclude, Type } from "class-transformer";

export class RelationMultiHasDto {
  constructor(
    fromEntityDto: EntityDto,
    toEntityDtos: EntityDto[],
    relType: RelationType
  ) {
    this.fromEntityDto = fromEntityDto;
    this.toEntityDtos = toEntityDtos;
    this.relType = relType;
  }

  @Exclude()
  get keys(): string {
    return this.toEntityDtos.map(value => value.key).join(",");
  }

  @ApiProperty({
    description: "The from entity identification",
    example: "from"
  })
  @ValidateNested()
  fromEntityDto: EntityDto;

  @ApiProperty({
    description: "The to entities id",
    example: "to"
  })
  @Type(() => EntityDto)
  @ValidateNested({
    each: true
  })
  toEntityDtos: EntityDto[];

  @ApiProperty({
    description: "The relation type",
    example: RelationType.follows
  })
  @IsEnum(RelationType)
  relType: RelationType;
}
