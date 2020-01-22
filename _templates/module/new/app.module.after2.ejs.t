---
inject: true
to: src/app.module.ts
after: TerminusModule\.forRootAsync\(\{
---
        <%= h.changeCase.pascal(name)%>Module,