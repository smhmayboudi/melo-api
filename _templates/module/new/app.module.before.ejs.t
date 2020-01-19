---
inject: true
to: src/app.module.ts
before: Module\(\{
---
import { <%= h.changeCase.pascal(name)%>Module } from "./<%= h.changeCase.camel(name)%>/<%= h.changeCase.dot(name)%>.module";