---
to: src/<%= h.changeCase.camel(name)%>/<%= h.changeCase.dot(name)%>.constant.ts
unless_exists: true
---
export const <%= h.changeCase.camel(name)%>Constant = {};
