import { Injectable } from "@nestjs/common";
import { AuthOptionsFactory, IAuthModuleOptions } from "@nestjs/passport";
// import { AuthConfigService } from "./auth.config.service";

@Injectable()
export class AuthAuthOptionsFactory implements AuthOptionsFactory {
  // constructor(private readonly authConfigService: AuthConfigService) {}

  createAuthOptions(): Promise<IAuthModuleOptions> | IAuthModuleOptions {
    return {
      defaultStrategy: "jwt",
      property: "user",
      session: false
      // [key: string]: any;
    };
  }
}
