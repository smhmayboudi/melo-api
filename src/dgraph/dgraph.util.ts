import { DgraphClient, DgraphClientStub } from "dgraph-js";
import { DgraphInstance, DgraphModuleOptions } from "./dgraph.module.interface";

let dgraphInstance: DgraphClient | undefined;
let dgraphInstanceStubs: DgraphClientStub[];

export function getOrCreateDgraphInstance(
  options: DgraphModuleOptions,
  isTest = false
): DgraphInstance {
  if (dgraphInstance === undefined || isTest) {
    dgraphInstanceStubs = options.stubs.map(
      (stub) =>
        new DgraphClientStub(stub.address, stub.credentials, stub.options)
    );
    dgraphInstance = new DgraphClient(...dgraphInstanceStubs);
    if (options.debug === true) {
      dgraphInstance.setDebugMode(true);
    }
  }
  return { client: dgraphInstance, stubs: dgraphInstanceStubs };
}
export function makeDefaultOptions(
  options?: DgraphModuleOptions
): DgraphModuleOptions {
  return {
    ...options,
    stubs: options === undefined ? [] : options.stubs,
  };
}
