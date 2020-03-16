import { Controller, Get, Header, Inject, Param } from "@nestjs/common";
import { Registry, register } from "prom-client";
import { PROM_REGISTRY_DEFAULT } from "./prom.constant";

@Controller()
export class PromController {
  constructor(
    @Inject(PROM_REGISTRY_DEFAULT)
    private readonly registry: Registry
  ) {}

  @Get(["", ":registryName"])
  @Header("Content-Type", register.contentType)
  index(@Param("registryName") _registryName: string): string {
    return this.registry.metrics();
  }
}
