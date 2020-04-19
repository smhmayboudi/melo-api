import { AuthOptionsFactory, IAuthModuleOptions } from "@nestjs/passport";

import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthAuthOptionsFactory implements AuthOptionsFactory {
  createAuthOptions(): Promise<IAuthModuleOptions> | IAuthModuleOptions {
    return {
      defaultStrategy: "jwt",
      property: "user",
      session: false,
    };
  }
}
