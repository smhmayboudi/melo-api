import {
  Allow,
  IsArray,
  IsNumberString,
  ValidateNested,
} from "class-validator";
import { Exclude, Type } from "class-transformer";

import { ApiProperty } from "@nestjs/swagger";

export class DataPaginationResDto<T> {
  constructor(results: T[], total: number, type: Function) {
    this.results = results;
    this.total = total;
    this.type = type;
  }

  @ApiProperty({
    description: "The results",
  })
  @Allow()
  @IsArray()
  @Type((options) =>
    options === undefined
      ? Function
      : (options.newObject as DataPaginationResDto<T>).type
  )
  @ValidateNested({
    each: true,
  })
  results: T[];

  @ApiProperty({
    description: "The total number of results",
    example: "0",
  })
  @IsNumberString()
  total: number;

  @Exclude()
  private type: Function;
}
