---
to: src/<%= h.changeCase.camel(name)%>/dto/<%= h.changeCase.dot(name)%>.test.dto.ts
unless_exists: true
---
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class <%= h.changeCase.pascal(name)%>TestDto {
  constructor(id: string) {
    this.id = id;
  }

  @ApiProperty({
    description: "The identification",
    example: "abcdef"
  })
  @IsString()
  id: string;
}
