import { Injectable } from "@nestjs/common";
import { DataServiceInterface } from "./data.service.interface";
// import { PromInstanceCounter } from "../prom/prom.decorators";

@Injectable()
// @PromInstanceCounter
export class DataService implements DataServiceInterface {}
