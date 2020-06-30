import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { APP_SERVICE } from "@melo/common";
import { AppConfigService } from "./app/app.config.service";
import { AppModule } from "./app/app.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

// import bodyParser from "body-parser";
// import cookieParser from "cookie-parser";
// import csurf from "csurf";
// import helmet from "helmet";
// import rateLimit from "express-rate-limit";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: true,
    logger: ["log", "error", "warn", "debug", "verbose"],
  });
  const appConfigService = app.get(AppConfigService);
  // app.use(
  //   bodyParser.urlencoded({
  //     extended: false,
  //   })
  // );
  // app.use(cookieParser());
  // app.use(
  //   csurf({
  //     cookie: true,
  //   })
  // );
  // app.use(helmet());
  // app.use(
  //   rateLimit({
  //     max: appConfigService.rateLimitMax,
  //     windowMs: appConfigService.rateLimitWindowMs,
  //   })
  // );
  const documentBuilder = new DocumentBuilder()
    .addBasicAuth(
      {
        description: "It is used for login procedure.",
        scheme: "basic",
        type: "http",
      },
      "local"
    )
    .addApiKey(
      {
        description: "It is used for the rest.",
        in: "header",
        name: "Authorization",
        type: "apiKey",
      },
      "jwt"
    )
    .addApiKey(
      {
        description: "It is used for getting access token procedure.",
        in: "header",
        name: "token",
        type: "apiKey",
      },
      "token"
    )
    .setContact(
      "Hossein Mayboudi",
      "https://www.linkedin.com/in/smhmayboudi/",
      "smhmayboudi@gmail.com"
    )
    .setDescription("The melo API description.")
    .setExternalDoc("Documentation | NestJS", "https://docs.nestjs.com/")
    .setLicense("MIT", "https://en.wikipedia.org/wiki/MIT_License")
    .setTermsOfService("https://en.wikipedia.org/wiki/Terms_of_service")
    .setTitle("melo api")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup("api", app, document, {
    customSiteTitle: "melo api | Swagger UI",
    explorer: false,
  });
  await app.listen(appConfigService.port, () => {
    Logger.log("Nest application is listening", APP_SERVICE);
  });
}
bootstrap();
