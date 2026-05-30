import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { FhirService } from "./fhir.service";
import { SignatureService } from "./signature.service";

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, FhirService, SignatureService],
  exports: [OrdersService],
})
export class OrdersModule {}
