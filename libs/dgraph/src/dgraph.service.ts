import { Inject, Injectable } from "@nestjs/common";

import { DGRAPH_INSTANCE_TOKEN } from "./dgraph.constant";
import { DgraphClient } from "dgraph-js";
import { DgraphInstance } from "./dgraph.module.interface";
import { DgraphServiceInterface } from "./dgraph.service.interface";

@Injectable()
export class DgraphService implements DgraphServiceInterface {
  constructor(
    @Inject(DGRAPH_INSTANCE_TOKEN)
    private readonly dgraphInstance: DgraphInstance
  ) {}

  get client(): DgraphClient {
    return this.dgraphInstance.client;
  }

  close(): void {
    if (this.dgraphInstance.stubs) {
      this.dgraphInstance.stubs.forEach((value) => {
        value.close();
      });
    }
  }
}
