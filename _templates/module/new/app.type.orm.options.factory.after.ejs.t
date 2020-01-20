---
inject: true
to: src/app.type.orm.options.factory.ts
after: entities
---
<%= h.changeCase.pascal(name)%>Entity,