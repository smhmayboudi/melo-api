import { DgraphClient, DgraphClientStub } from "dgraph-js";
import { ModuleMetadata, Type } from "@nestjs/common/interfaces";

import { ChannelCredentials } from "grpc";

export interface DgraphFilterFunction {
  (exception: unknown): boolean;
}
export interface DgraphInterceptorOptionsFilter {
  filter?: DgraphFilterFunction;
  type: unknown;
}
export interface DgraphModuleOptions {
  debug?: boolean;
  stubs: {
    address?: string;
    credentials?: ChannelCredentials;
    options?: object;
  }[];
}
export interface DgraphOptionsFactory {
  createDgraphOptions(): Promise<DgraphModuleOptions> | DgraphModuleOptions;
}
export interface DgraphModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  inject?: any[];
  useClass?: Type<DgraphOptionsFactory>;
  useExisting?: Type<DgraphOptionsFactory>;
  useFactory?: (
    ...args: unknown[]
  ) => Promise<DgraphModuleOptions> | DgraphModuleOptions;
}
export interface DgraphInstance {
  client: DgraphClient;
  stubs: DgraphClientStub[];
}
