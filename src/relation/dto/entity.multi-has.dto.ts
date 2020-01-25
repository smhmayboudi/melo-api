import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, ValidateNested } from "class-validator";
import { RelationType } from "../type/relation.type";
import { EntityDto } from "./entity.dto";
import { Expose, Transform } from "class-transformer";

export class EntityMultiHasDto {
  constructor(from: EntityDto, relation: RelationType, to: EntityDto) {
    this.from = from;
    this.relation = relation;
    this.to = to;
  }

  @ApiProperty({
    description: "The from entity",
    example: 0
  })
  @Expose({ name: "fromEntitiyId" })
  @Transform(value => value.key)
  @ValidateNested()
  from: EntityDto;

  @ApiProperty({
    description: "The relation type",
    example: RelationType.follows
  })
  @IsEnum(RelationType)
  relation: RelationType;

  @ApiProperty({
    description: "The to entity",
    example: 0
  })
  @Expose({ name: "toEntitiyId" })
  @Transform(value => value.key)
  @ValidateNested()
  to: EntityDto;
}