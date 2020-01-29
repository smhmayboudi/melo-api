import { Injectable } from "@nestjs/common";
import querystring from "querystring";

@Injectable()
export class AppQueryStringService {
  // constructor () {}

  parse(str: string): { [key: string]: string } {
    return querystring.parse(str, "&", "=", {
      decodeURIComponent: (str2: string): string => querystring.unescape(str2)
    }) as { [key: string]: string };
  }

  stringify(obj: { [key: string]: string }): string {
    return querystring.stringify(obj, "&", "=", {
      encodeURIComponent: (str2: string): string => querystring.escape(str2)
    });
  }
}
