---
inject: true
to: src/app.module.ts
after: imports
---
    <%= h.changeCase.pascal(name)%>Module,