---
to: src/<%= h.changeCase.camel(name)%>/<%= h.changeCase.dot(name)%>.entity.repository.ts
unless_exists: true
---
import { EntityRepository, Repository } from "typeorm";
import { <%= h.changeCase.pascal(name)%>Entity } from "./<%= h.changeCase.dot(name)%>.entity";

@EntityRepository(<%= h.changeCase.pascal(name)%>Entity)
export class <%= h.changeCase.pascal(name)%>EntityRepository extends Repository<<%= h.changeCase.pascal(name)%>Entity> {}
