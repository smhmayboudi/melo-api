import { DgraphClient } from "dgraph-js";

export interface DgraphServiceInterface {
  client: DgraphClient;
  close(): void;
}
