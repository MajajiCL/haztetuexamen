import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

/**
 * NestJS API Gateway de Haztetuexamen.cl
 *
 * Responsabilidades (según brief arquitectura):
 *  - Microservicio de Firma Digital (Criptografía FES)
 *  - Motor de Ficha Clínica Interoperable (HL7 FHIR JSON)
 *  - Control de accesos y cifrado
 *
 * Para el MVP, muchas de estas funciones también viven en
 * apps/web/src/app/api/ (Next.js API routes).
 * La migración hacia NestJS se hace cuando el tráfico justifique
 * la separación física de servicios.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
      credentials: true,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  const port = Number(process.env.API_PORT ?? 3001);
  await app.listen(port);
  console.log(`🚀 API NestJS escuchando en http://localhost:${port}`);
}
bootstrap();
