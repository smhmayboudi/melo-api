import { DataServiceInterface } from "./data.service.interface";
import { Injectable } from "@nestjs/common";
// import { PromInstanceCounter } from "../prom/prom.decorators";

@Injectable()
// @PromInstanceCounter
export class DataService implements DataServiceInterface {}
