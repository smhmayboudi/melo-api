import { Injectable } from "@nestjs/common";

@Injectable()
export class AppQueryStringService {
  // constructor () {}

  parse(text: string): { [key: string]: string } {
    return JSON.parse(text);
  }

  stringify(value: { [key: string]: string }): string {
    return JSON.stringify(value);
  }
}
