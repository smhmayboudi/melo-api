---
inject: true
to: src/app.type.orm.options.factory.ts
before: \@Injectable\(\)
---
import { <%= h.changeCase.pascal(name)%>Entity } from "./<%= h.changeCase.camel(name)%>/<%= h.changeCase.dot(name)%>.entity";