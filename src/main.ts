import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
// import * as csurf from "csurf";
import * as rateLimit from "express-rate-limit";
import * as helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: true
  });
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  // app.use(csurf({ cookie: true }));
  app.use(helmet());
  app.use(
    rateLimit({
      max: 100, // limit each IP to 100 requests per windowMs
      windowMs: 15 * 60 * 1000 // 15 minutes
    })
  );

  const options = new DocumentBuilder()
    .setTitle("melo api")
    .setDescription("The melo API description.")
    .setVersion("1.0")
    .addTag("melo api")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
