---
to: src/<%= h.changeCase.camel(name)%>/<%= h.changeCase.dot(name)%>.service.ts
unless_exists: true
---
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { <%= h.changeCase.pascal(name)%>TestDto } from "./dto/<%= h.changeCase.dot(name)%>.test.dto";
import { <%= h.changeCase.pascal(name)%>Entity } from "./<%= h.changeCase.dot(name)%>.entity";
import { <%= h.changeCase.pascal(name)%>EntityRepository } from "./<%= h.changeCase.dot(name)%>.entity.repository";

@Injectable()
export class <%= h.changeCase.pascal(name)%>Service {
  constructor(
    @InjectRepository(<%= h.changeCase.pascal(name)%>Entity)
    private readonly <%= h.changeCase.camel(name)%>EntityRepository: <%= h.changeCase.pascal(name)%>EntityRepository
  ) {}

  async findOne(dto: <%= h.changeCase.pascal(name)%>TestDto): Promise<<%= h.changeCase.pascal(name)%>TestDto | undefined> {
    return this.<%= h.changeCase.camel(name)%>EntityRepository.findOne({ id: dto.id });
  }
}
