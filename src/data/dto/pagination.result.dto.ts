import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Type } from "class-transformer";
import { Allow, IsArray, IsNumber, ValidateNested } from "class-validator";

export class PaginationResultDto<T> {
  constructor(results: T[], total: number, type: Function) {
    this.results = results;
    this.total = total;
    this.type = type;
  }

  @ApiProperty({
    description: "The results"
  })
  @Allow()
  @IsArray()
  @Type(options => {
    if (options === undefined) {
      return Function;
    }
    return (options.newObject as PaginationResultDto<T>).type;
  })
  @ValidateNested({
    each: true
  })
  results: T[];

  @ApiProperty({
    description: "The total number of results",
    example: 1
  })
  @IsNumber()
  total: number;

  @Exclude()
  private type: Function;
}
