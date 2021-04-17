import { IsEnum, IsNumberString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { SearchType } from "@melo/common";

export class TagAssignReqDto {
  constructor(category: SearchType, categoryId: number, tagId: number) {
    this.category = category;
    this.categoryId = categoryId;
    this.tagId = tagId;
  }

  @ApiProperty({
    description: "The category",
    example: SearchType.song,
  })
  @IsEnum(SearchType)
  readonly category: SearchType;

  @ApiProperty({
    description: "The identification",
    example: "0",
  })
  @IsNumberString()
  readonly categoryId: number;

  @ApiProperty({
    description: "The identification",
    example: "0",
  })
  @IsNumberString()
  readonly tagId: number;
}
