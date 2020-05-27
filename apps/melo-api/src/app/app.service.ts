import { AppServiceInterface } from "./app.service.initerface";
import { Injectable } from "@nestjs/common";

@Injectable()
// @PromInstanceCounter
export class AppService implements AppServiceInterface {}
