import { NestFactory } from "@nestjs/core";
import * as csurf from "csurf";
import * as rateLimit from "express-rate-limit";
import * as helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    logger: true,
    cors: true
  });
  app.use(csurf());
  app.use(helmet());
  app.use(
    rateLimit({
      max: 100, // limit each IP to 100 requests per windowMs
      windowMs: 15 * 60 * 1000 // 15 minutes
    })
  );
  await app.listen(3000);
}
bootstrap();
