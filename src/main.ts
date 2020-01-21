import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
// import * as csurf from "csurf";
import * as rateLimit from "express-rate-limit";
import * as helmet from "helmet";
import "source-map-support/register";
import { AppConfigService } from "./app.config.service";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: true,
    logger: ["log", "error", "warn", "debug", "verbose"]
  });

  const appConfigService = app.get(AppConfigService);

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  // app.use(csurf({ cookie: true }));
  app.use(helmet());
  app.use(
    rateLimit({
      max: appConfigService.rateLimitMax, // limit each IP to 100 requests per windowMs
      windowMs: appConfigService.rateLimitwindowMs // 15 minutes
    })
  );

  const options = new DocumentBuilder()
    .addBasicAuth(
      {
        description: "It is used for login procedure.",
        scheme: "basic",
        type: "http"
      },
      "local"
    )
    .addBearerAuth(
      {
        description: "It is used for the rest.",
        bearerFormat: "JWT",
        in: "header",
        name: "Authorization",
        scheme: "JWT",
        type: "apiKey"
      },
      "jwt"
    )
    .addBearerAuth(
      {
        description: "It is used for getting access token procedure.",
        in: "header",
        name: "token",
        type: "apiKey"
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
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document, {
    explorer: false,
    // customfavIcon?: string;
    // customCss?: string;
    // customJs?: string;
    customSiteTitle: "melo api | Swagger UI"
    // swaggerOptions?: any;
    // swaggerUrl?: string;
  });

  await app.listen(appConfigService.port);
}
bootstrap();
