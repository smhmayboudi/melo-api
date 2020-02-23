import { Controller, Get, Response } from "@nestjs/common";
import express from "express";
import client from "prom-client";

@Controller()
export class PromController {
  @Get()
  index(@Response() response: express.Response): void {
    response.set("Content-Type", client.register.contentType);
    response.end(client.register.metrics());
  }
}
