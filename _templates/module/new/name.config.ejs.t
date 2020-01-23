---
to: src/<%= h.changeCase.camel(name)%>/<%= h.changeCase.dot(name)%>.config.ts
unless_exists: true
---
import { registerAs } from "@nestjs/config";

export default registerAs("<%= h.changeCase.camel(name)%>", () => ({
  cacheHost: process.env.<%= h.changeCase.snake(name).toUpperCase()%>_CACHE_HOST,
  cacheMax: process.env.<%= h.changeCase.snake(name).toUpperCase()%>_CACHE_MAX,
  cachePort: process.env.<%= h.changeCase.snake(name).toUpperCase()%>_CACHE_PORT,
  cacheStore: process.env.<%= h.changeCase.snake(name).toUpperCase()%>_CACHE_STORE,
  cacheTTL: process.env.<%= h.changeCase.snake(name).toUpperCase()%>_CACHE_TTL
}));
