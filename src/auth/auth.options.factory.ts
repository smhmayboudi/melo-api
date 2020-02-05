import { Injectable } from "@nestjs/common";
import { AuthOptionsFactory, IAuthModuleOptions } from "@nestjs/passport";

@Injectable()
export class AuthAuthOptionsFactory implements AuthOptionsFactory {
  createAuthOptions(): Promise<IAuthModuleOptions> | IAuthModuleOptions {
    return {
      defaultStrategy: "jwt",
      property: "user",
      session: false
    };
  }
}
