import { DataServiceInterface } from "./data.service.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
// @PromInstanceCounter
export class DataService implements DataServiceInterface {}
