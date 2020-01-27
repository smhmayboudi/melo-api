import { Injectable } from "@nestjs/common";

@Injectable()
export class ConstService {
  // constructor() {}

  async images(): Promise<any> {
    return Promise.resolve();
  }
}
