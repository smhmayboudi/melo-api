---
inject: true
to: src/app.terminus.options.factory.ts
before: \@Injectable\(\)
---
import { <%= h.changeCase.pascal(name)%>HealthIndicator } from "./<%= h.changeCase.camel(name)%>/<%= h.changeCase.dot(name)%>.health";