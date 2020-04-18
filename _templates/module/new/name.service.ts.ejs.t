---
to: src/<%= h.changeCase.camel(name)%>/<%= h.changeCase.dot(name)%>.service.ts
unless_exists: true
---
//import { CounterMetric, InjectCounterMetric } from "@digikare/nestjs-prom";
import { Injectable } from "@nestjs/common";
// import { Counter } from "prom-client";
// import { InjectMetric } from "../prom/prom.injector";
import { InjectRepository } from "@nestjs/typeorm";
import { <%= h.changeCase.pascal(name)%>TestDto } from "./dto/<%= h.changeCase.dot(name)%>.test.dto";
import { <%= h.changeCase.pascal(name)%>Entity } from "./<%= h.changeCase.dot(name)%>.entity";
import { <%= h.changeCase.pascal(name)%>Module } from "./<%= h.changeCase.dot(name)%>.module";
import { <%= h.changeCase.pascal(name)%>EntityRepository } from "./<%= h.changeCase.dot(name)%>.entity.repository";

@Injectable()
export class <%= h.changeCase.pascal(name)%>Service {
  constructor(
    @InjectMetric("<%= h.inflection.underscore(name)%>_counter")
    private readonly counter: Counter,
    @InjectRepository(<%= h.changeCase.pascal(name)%>Entity)
    private readonly <%= h.changeCase.camel(name)%>EntityRepository: <%= h.changeCase.pascal(name)%>EntityRepository
  ) {}

  async findOne(dto: <%= h.changeCase.pascal(name)%>TestDto): Promise<<%= h.changeCase.pascal(name)%>TestDto | undefined> {
    this.counter.inc({
      module: <%= h.changeCase.pascal(name)%>Module.name,
      service: <%= h.changeCase.pascal(name)%>Service.name,
      function: this.findOne.name
    });
    return this.<%= h.changeCase.camel(name)%>EntityRepository.findOne({ id: dto.id });
  }
}
